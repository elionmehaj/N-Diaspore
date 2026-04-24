import { getDb } from './db';

class RouteAnalyzer {
  name: string = 'RouteAnalyzer';
  lastRun: Date | null = null;
  status: string = 'idle';

  log(msg: string) {
    console.log(`[${this.name}] ${msg}`);
  }

  async run() {
    this.status = 'running';
    this.log('Starting route analysis...');
    const startTime = Date.now();

    try {
      const db = getDb();
      const collection = db.collection('trips');

      const now = new Date();
      const trips = await collection.find({
        departure_time: { $gte: now }
      }).toArray();

      this.log(`Analyzing ${trips.length} active trips...`);

      const groups: Record<string, any[]> = {};
      for (const trip of trips) {
        const key = `${trip.type}|${trip.origin || trip.originCity}|${trip.destination || trip.destinationCity}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(trip);
      }

      let tagged = 0;

      for (const [key, routeTrips] of Object.entries(groups)) {
        if (routeTrips.length === 0) continue;

        const withScores = routeTrips.map(t => ({
          ...t,
          valueScore: t.price > 0 ? t.duration / t.price : 999,
          pricePerMin: t.duration > 0 ? t.price / t.duration : 999
        }));

        const byPrice = [...withScores].sort((a, b) => a.price - b.price);
        const byDuration = [...withScores].sort((a, b) => a.duration - b.duration);
        const byValue = [...withScores].sort((a, b) => a.pricePerMin - b.pricePerMin);
        const byWorst = [...withScores].sort((a, b) => {
          const scoreA = a.duration + (a.layovers || 0) * 120;
          const scoreB = b.duration + (b.layovers || 0) * 120;
          return scoreB - scoreA;
        });

        const prices = withScores.map(t => t.price).sort((a, b) => a - b);
        const medianPrice = prices[Math.floor(prices.length / 2)];
        const medianRange = medianPrice * 0.2;

        for (const trip of withScores) {
          let tag = 'medium';

          if (byValue.length > 0 && trip._id.toString() === byValue[0]._id.toString()) {
            tag = 'best';
          }
          else if (byDuration.length > 0 && trip._id.toString() === byDuration[0]._id.toString()) {
            tag = 'shortest';
          }
          else if (byWorst.length > 0 && trip._id.toString() === byWorst[0]._id.toString()) {
            tag = 'longest';
          }
          else if (Math.abs(trip.price - medianPrice) <= medianRange) {
            tag = 'medium';
          }

          await collection.updateOne(
            { _id: trip._id },
            {
              $set: {
                category_tag: tag,
                updatedAt: new Date()
              }
            }
          );
          tagged++;
        }

        const dateMap: Record<string, number[]> = {};
        for (const trip of routeTrips) {
          const dateKey = trip.departure_time.toISOString().split('T')[0];
          if (!dateMap[dateKey]) dateMap[dateKey] = [];
          dateMap[dateKey].push(trip.price);
        }

        const datePrices = Object.entries(dateMap).map(([date, prices]) => ({
          date,
          avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length
        })).sort((a, b) => a.avgPrice - b.avgPrice);

        const bestDates = datePrices.slice(0, 3).map(d => new Date(d.date));
        if (bestDates.length > 0) {
          const originVal = routeTrips[0].origin || routeTrips[0].originCity;
          const destVal = routeTrips[0].destination || routeTrips[0].destinationCity;
          await collection.updateMany(
            {
              type: routeTrips[0].type,
              $and: [
                { $or: [{ origin: originVal }, { originCity: originVal }] },
                { $or: [{ destination: destVal }, { destinationCity: destVal }] }
              ]
            },
            { $set: { best_dates: bestDates } }
          );
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      this.log(`Completed in ${elapsed}s — Tagged ${tagged} trips across ${Object.keys(groups).length} routes`);
      this.lastRun = new Date();
      this.status = 'idle';

      return { success: true, tagged, routes: Object.keys(groups).length, elapsed };
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

export default new RouteAnalyzer();
