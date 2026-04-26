import { Router, type IRouter } from "express";
import { getDb } from "../agents-core/db.js";
import config from "../agents-core/config.js";
import customerConcierge from "../agents-core/customerConcierge.js";


const router: IRouter = Router();

router.get("/flights/trending", async (req, res, next) => {
  try {
    const db = getDb();
    const now = new Date();

    const flights = await db
      .collection("trips")
      .find({
        type: "flight",
        departure_time: { $gte: now },
      })
      .sort({ price: 1 })
      .limit(12)
      .toArray();

    res.json({
      count: flights.length,
      data: flights.map((f) => ({
        id: f._id,
        origin: f.originCity || f.origin,
        destination: f.destinationCity || f.destination,
        airline: f.airline_or_operator,
        airlineCode: f.airline_code,
        operatorLogo: f.operator_logo,
        price: f.price,
        currency: f.currency || "EUR",
        duration: f.duration,
        layovers: f.layovers,
        departureTime: f.departure_time,
        arrivalTime: f.arrival_time,
        categoryTag: f.category_tag,
        link: f.link,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/buses/routes", async (req, res, next) => {
  try {
    const db = getDb();
    const now = new Date();

    const buses = await db
      .collection("trips")
      .find({
        type: "bus",
        departure_time: { $gte: now },
      })
      .sort({ price: 1 })
      .limit(12)
      .toArray();

    res.json({
      count: buses.length,
      data: buses.map((b) => ({
        id: b._id,
        origin: b.originCity || b.origin,
        destination: b.destinationCity || b.destination,
        operator: b.airline_or_operator,
        operatorLogo: b.operator_logo,
        price: b.price,
        currency: b.currency || "EUR",
        duration: b.duration,
        departureTime: b.departure_time,
        arrivalTime: b.arrival_time,
        categoryTag: b.category_tag,
        link: b.link,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/dates/best", async (req, res, next) => {
  try {
    const db = getDb();
    const now = new Date();

    const trips = await db
      .collection("trips")
      .find({
        departure_time: { $gte: now },
        best_dates: { $exists: true, $ne: [] },
      })
      .limit(100)
      .toArray();

    const dateMap: Record<string, any> = {};
    for (const trip of trips) {
      if (!trip.best_dates) continue;
      for (const d of trip.best_dates) {
        const dateKey = new Date(d).toISOString().split("T")[0];
        if (!dateMap[dateKey]) {
          dateMap[dateKey] = { date: dateKey, routes: [], avgPrice: 0, count: 0 };
        }
        dateMap[dateKey].routes.push({
          origin: trip.originCity || trip.origin,
          destination: trip.destinationCity || trip.destination,
          type: trip.type,
          price: trip.price,
        });
        dateMap[dateKey].avgPrice += trip.price;
        dateMap[dateKey].count++;
      }
    }

    const bestDates = Object.values(dateMap)
      .map((d: any) => ({
        ...d,
        avgPrice: Math.round(d.avgPrice / d.count),
        routeCount: d.routes.length,
      }))
      .sort((a, b) => a.avgPrice - b.avgPrice)
      .slice(0, 15);

    res.json({
      count: bestDates.length,
      data: bestDates,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/chat", async (req: any, res: any, next) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: true, message: "Message is required" });
    }

    const sid = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    
    // Use the unified CustomerConcierge agent
    const response = await customerConcierge.chat(sid, message);

    return res.json({
      sessionId: sid,
      ...response
    });
  } catch (err) {
    console.error("Chat endpoint error:", err);
    next(err);
  }
});


export default router;
