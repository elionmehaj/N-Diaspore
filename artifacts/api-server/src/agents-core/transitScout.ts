import { getDb } from './db';
import { generateBuses } from './seedData';

class TransitScout {
  name: string = 'TransitScout';
  lastRun: Date | null = null;
  status: string = 'idle';
  flixBusBaseUrl: string = 'https://1.flixbus.transport.rest';

  log(msg: string) {
    console.log(`[${this.name}] ${msg}`);
  }

  async fetchFlixBusRoutes() {
    const routes: any[] = [];
    const stationIds: Record<string, string> = {
      'Prishtina': '23458',
      'Munich': '1',
      'Vienna': '1394',
      'Zurich': '1154',
      'Stuttgart': '534',
      'Frankfurt': '1',
      'Berlin': '88',
    };

    const pairs = [
      ['Prishtina', 'Munich'],
      ['Prishtina', 'Vienna'],
      ['Prishtina', 'Berlin'],
    ];

    for (const [from, to] of pairs) {
      const fromId = stationIds[from];
      const toId = stationIds[to];
      if (!fromId || !toId) continue;

      try {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        const dateStr = date.toISOString().split('T')[0];

        const url = `${this.flixBusBaseUrl}/journeys?origin=${fromId}&destination=${toId}&date=${dateStr}&adults=1`;
        this.log(`Fetching FlixBus: ${from} → ${to}`);

        const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (resp.ok) {
          const data: any = await resp.json();
          if (Array.isArray(data) && data.length > 0) {
            for (const journey of data.slice(0, 3)) {
              routes.push({
                type: 'bus',
                origin: from,
                originCity: from,
                destination: to,
                destinationCity: to,
                airline_or_operator: 'FlixBus',
                operator_logo: 'flixbus',
                price: journey.price?.amount || Math.floor(Math.random() * 40) + 30,
                currency: 'EUR',
                duration: journey.duration ? Math.floor(journey.duration / 60) : 600,
                layovers: 0,
                departure_time: new Date(journey.departure),
                arrival_time: new Date(journey.arrival),
                category_tag: null,
                best_dates: [],
                link: `https://www.flixbus.com/bus/${from.toLowerCase()}-${to.toLowerCase()}`,
                source: 'flixbus',
                createdAt: new Date(),
                updatedAt: new Date()
              });
            }
          }
        }
      } catch (err) {
        this.log(`FlixBus API failed for ${from}→${to}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    return routes;
  }

  async run() {
    this.status = 'running';
    this.log('Starting bus route data collection...');
    const startTime = Date.now();

    try {
      const db = getDb();
      const collection = db.collection('trips');

      const now = new Date();
      const deleted = await collection.deleteMany({
        type: 'bus',
        departure_time: { $lt: now }
      });
      this.log(`Cleaned up ${deleted.deletedCount} expired bus entries`);

      let liveRoutes: any[] = [];
      try {
        liveRoutes = await this.fetchFlixBusRoutes();
        this.log(`Fetched ${liveRoutes.length} live FlixBus routes`);
      } catch (err) {
        this.log(`Live data fetch failed, using seed data: ${err instanceof Error ? err.message : String(err)}`);
      }

      const seedBuses = generateBuses();
      this.log(`Generated ${seedBuses.length} seed bus routes`);

      const allRoutes = [...liveRoutes];
      const coveredPairs = new Set(liveRoutes.map(r => `${r.origin}-${r.destination}`));

      for (const bus of seedBuses) {
        const key = `${bus.origin}-${bus.destination}`;
        if (!coveredPairs.has(key)) {
          allRoutes.push(bus);
        }
      }

      let inserted = 0;
      let updated = 0;
      for (const route of allRoutes) {
        const existing = await collection.findOne({
          type: 'bus',
          origin: route.origin,
          destination: route.destination,
          airline_or_operator: route.airline_or_operator,
          departure_time: {
            $gte: new Date(route.departure_time.getTime() - 7200000),
            $lte: new Date(route.departure_time.getTime() + 7200000)
          }
        });

        if (existing) {
          await collection.updateOne(
            { _id: existing._id },
            { $set: { price: route.price, updatedAt: new Date() } }
          );
          updated++;
        } else {
          await collection.insertOne(route);
          inserted++;
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      this.log(`Completed in ${elapsed}s — Inserted: ${inserted}, Updated: ${updated}, Live: ${liveRoutes.length}`);
      this.lastRun = new Date();
      this.status = 'idle';

      return { success: true, inserted, updated, liveRoutes: liveRoutes.length, elapsed };
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

export default new TransitScout();
