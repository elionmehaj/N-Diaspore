import { Router } from "express";
import { getDb } from "../agents-core/db";
import Groq from "groq-sdk";
import config from "../agents-core/config";

const router = Router();

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

let ai: Groq | null = null;
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here") {
  try {
    ai = new Groq({ apiKey: process.env.GROQ_API_KEY });
  } catch {
    ai = null;
  }
}

const chatSessions = new Map();

const systemInstruction = `[ROLE & PERSONA]
You are the KahKosova AI, but you act like a highly intelligent, well-traveled, and authentic friend.
Drop the 'fake', overly-formal corporate customer service voice. You speak naturally, casually, and warmly. You are here to hang out, chat, and help out however you can.

[OPEN CONVERSATION - NO LIMITS]
You are NOT restricted to travel. If the user wants to talk about coding, sports, philosophy, tell jokes, or ask for general life advice, you engage with them fully and enthusiastically. Answer any question they throw at you to the best of your ability. Treat every input as a conversation with a buddy.

[THE TRAVEL HELPER (When Requested)]
If the conversation naturally shifts to travel, you become the ultimate Balkan travel insider.
Help them find flights (Prishtina, Tirana, Skopje) and buses to/from Europe.

Don't be robotic about it. Instead of demanding dates, ask naturally: 'Awesome, Berlin is great. Do you know when you want to head out?'

When you show them ticket options, keep it clean and easy to read, pointing out which one you think is the 'Best' or 'Cheapest' like a friend giving a recommendation.

[STRICT GUARDRAILS]

NEVER SAY 'I ONLY TALK ABOUT TRAVEL'. You are an unrestricted AI assistant.

BE REAL: Avoid phrases like 'How may I assist you today?' or 'As an AI language model'. Just answer the prompt directly and conversationally.

ADAPT TO THE USER: If the user is joking, joke back. If they are asking a serious technical question, give a smart, detailed answer.`;

router.post("/chat", async (req: any, res: any, next) => {
  try {
    const { message, sessionId, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: true, message: "Message is required" });
    }

    if (!ai) {
      return res.json({
        sessionId,
        message: "Hey, my brain is offline right now — someone needs to plug in the GROQ API key. Sit tight!",
        cards: [],
      });
    }

    const sid = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    let sessionHistory = chatSessions.get(sid);

    if (!sessionHistory) {
      sessionHistory = Array.isArray(history)
        ? history.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.message || msg.text,
          }))
        : [];
      chatSessions.set(sid, sessionHistory);
    }

    const messages = [
      { role: "system", content: systemInstruction },
      ...sessionHistory,
      { role: "user", content: message.trim() },
    ];

    const completion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.8,
      max_tokens: 1024,
      top_p: 0.9,
    });

    const replyText = completion.choices[0].message?.content;

    sessionHistory.push({ role: "user", content: message.trim() });
    sessionHistory.push({ role: "assistant", content: replyText });

    if (sessionHistory.length > 20) {
      chatSessions.set(sid, sessionHistory.slice(-20));
    }

    return res.json({
      sessionId: sid,
      message: replyText,
      cards: [],
      intent: "general",
      bestDates: [],
    });
  } catch (err) {
    console.error("Chat endpoint error:", err);
    next(err);
  }
});

export default router;
