import { getDb } from './db';
import { generateFlights } from './seedData';

class AeroScout {
  name: string = 'AeroScout';
  lastRun: Date | null = null;
  status: string = 'idle';

  log(msg: string) {
    console.log(`[${this.name}] ${msg}`);
  }

  async run() {
    this.status = 'running';
    this.log('Starting flight data collection...');
    const startTime = Date.now();

    try {
      const db = getDb();
      const collection = db.collection('trips');

      this.log('No Amadeus API key configured — generating realistic seed flight data');

      const now = new Date();
      const deleted = await collection.deleteMany({
        type: 'flight',
        source: 'seed',
        departure_time: { $lt: now }
      });
      this.log(`Cleaned up ${deleted.deletedCount} expired flight entries`);

      const flights = generateFlights();

      let inserted = 0;
      let updated = 0;
      for (const flight of flights) {
        const existing = await collection.findOne({
          type: 'flight',
          origin: flight.origin,
          destination: flight.destination,
          airline_or_operator: flight.airline_or_operator,
          departure_time: {
            $gte: new Date(flight.departure_time.getTime() - 3600000),
            $lte: new Date(flight.departure_time.getTime() + 3600000)
          }
        });

        if (existing) {
          await collection.updateOne(
            { _id: existing._id },
            { $set: { price: flight.price, updatedAt: new Date() } }
          );
          updated++;
        } else {
          await collection.insertOne(flight);
          inserted++;
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      this.log(`Completed in ${elapsed}s — Inserted: ${inserted}, Updated: ${updated}`);
      this.lastRun = new Date();
      this.status = 'idle';

      return { success: true, inserted, updated, elapsed };
    } catch (err) {
      this.status = 'error';
      const msg = err instanceof Error ? err.message : String(err);
      this.log(`Error: ${msg}`);
      return { success: false, error: msg };
    }
  }

  getStatus() {
    return {
      name: this.name,
      status: this.status,
      lastRun: this.lastRun
    };
  }
}

export default new AeroScout();
