import Groq from 'groq-sdk';
import config from './config.js';
import { getDb } from './db.js';

// ─── Capabilities Manifest ────────────────────────────────────────────────────
// This is injected into every system prompt. It tells the LLM exactly what
// the KahKosova platform can do, mapped to real frontend routes.
// Status: LIVE = real data from AI agents; READY = full UI, mock data
// ─────────────────────────────────────────────────────────────────────────────
const CAPABILITIES_MANIFEST = `
[KAHKOSOVA PLATFORM — FULL CAPABILITIES MANIFEST]
You are the AI Operating System for KahKosova — a diaspora super-platform for Albanians & Kosovars living abroad.
The platform has the following sections. Use them to guide users. Always reference the route path when relevant.

━━━ LIVE FEATURES (You have real data — search & recommend actively) ━━━

1. ✈️ TRANSPORTI — Flight & Bus Search  [Route: /transporti]
   Purpose: Find the cheapest flights from PRN/TIA/SKP to European cities, or bus routes (Prishtina → Munich etc.)
   Trigger words: flight, fly, plane, bus, coach, travel, trip, Munich, Vienna, Berlin, London, Zurich, Rome, etc.
   Status: LIVE — real AI-scouted data, updated every 4 hours

2. 🤖 AI AGJENTI — AI Travel Dashboard  [Route: /agjenti]
   Purpose: View live AI agent flight/bus leaderboards + chat with me. The user is probably already here.
   Trigger words: AI, agent, dashboard, leaderboard, cheapest right now, best deals

3. 📅 BEST DATES — When to Travel  [Route: /agjenti → "Datat më të mira" tab]
   Purpose: Algorithmically calculated cheapest travel dates based on 30-day price averages
   Trigger words: when to go, best time to fly, cheapest date, when is it cheap

━━━ READY FEATURES (Full UI, not yet connected to live data — still worth sending users there) ━━━

4. 🌍 LAND LEASING — Property & Land Management  [Route: /land-leasing]
   Psychological Purpose: Reduces the 'disconnection anxiety' diaspora feel about their land back home. For Albanians, land is identity.
   Trigger words: land, property, prona, tokë, field, house, real estate, lease, manage, invest in land, I have land in Kosovo
   Value: Interactive map, property listings, leasing tools for diaspora who own property but can't physically be there

5. 🎁 GIFT GATEWAY — Send Gifts & Food to Family  [Route: /services/gift-gateway]
   Psychological Purpose: Maintains emotional connection with family when physical presence is impossible.
   Trigger words: send, gift, food, present, family, mom, grandmother, birthday, holiday, I want to send something
   Value: Curated packages of food & gifts delivered to Kosovar addresses

6. 📄 FORM BUILDER — Bilingual Legal Documents  [Route: /services/form-builder]
   Psychological Purpose: Removes bureaucracy paralysis — one of the biggest stressors for diaspora
   Trigger words: document, form, legal, paperwork, notary, certificate, contract, power of attorney, declaration, official, letër, formular
   Value: Generates bilingual (Albanian + German) legal documents for Kosovo institutions

7. ✅ RETURN CHECKLIST — 'Going Home' Preparation Guide  [Route: /services/checklist]
   Psychological Purpose: Returning home after years abroad is overwhelming. This makes it manageable.
   Trigger words: returning, going back, I'm moving back, return to Kosovo, I want to come home, checklist, prepare
   Value: Step-by-step personalized checklist covering documents, housing, banking, schools

8. 🔩 CONSTRUCTION — Building Projects in Kosovo  [Route: /ndertimi]
   Psychological Purpose: Diaspora buildings houses/villas but can't supervise remotely. Huge anxiety.
   Trigger words: build, construction, house, villa, contractor, architect, builders, renovate, building project, ndërtim
   Value: Vetted contractors, project monitoring, cost transparency for diaspora building remotely

9. 💊 HEALTHCARE — Medical Services for Family in Kosovo  [Route: /shendeti]
   Psychological Purpose: Worrying about sick parents/relatives abroad is one of the highest stressors.
   Trigger words: doctor, clinic, hospital, sick, health, medical, appointment, checkup, shëndet, mjek, për familjen
   Value: Clinic discovery, remote appointment booking, pharmacy coordination for family members

10. 📈 INVESTMENTS — Kosovo Opportunity Fund  [Route: /investime]
    Psychological Purpose: Diaspora want to contribute to Kosovo's economy and grow wealth simultaneously.
    Trigger words: invest, investment, ROI, returns, business opportunity, passive income, economy, bereqet, startup Kosovo
    Value: Vetted Kosovo business investment opportunities with projected ROI

11. 🏢 BIZNESET — Albanian Diaspora Business Directory  [Route: /bizneset]
    Psychological Purpose: Pride in community + need for trusted Albanian-run services abroad.
    Trigger words: restaurant, Albanian business, Kosovo restaurant, find a business, diaspora business, gastronomy
    Value: Verified database of Albanian/Kosovar businesses in Germany, Switzerland, Austria

12. 🌳 GJURMET — Family Genealogy Archive  [Route: /gjurmet]
    Psychological Purpose: Deepest emotional need — maintaining cultural identity across generations.
    Trigger words: grandfather, family history, ancestors, roots, village, where did my family come from, genealogy, surname, history, rrënjë, trashëgimi
    Value: Historical archive search spanning Ottoman archives to 2008 Kosovo independence

13. 🛂 KUFIRI — Live Kosovo Border Info  [Route: /kufiri]
    Psychological Purpose: Reduces travel anxiety for people crossing into Kosovo.
    Trigger words: border, crossing, waiting time, kufiri, how long at the border, customs, crossing from Serbia/Albania/N.Macedonia
    Value: Real-time border crossing wait times and tips

14. 🗣️ GJUHA JONË — Albanian Language Hub  [Route: /gjuha-jone]
    Psychological Purpose: Children of diaspora losing their mother tongue — a cultural grief for parents.
    Trigger words: Albanian language, my kids don't speak Albanian, language learning, gjuha shqipe, teach Albanian, dialect
    Value: Albanian language resources, educational tools, dialect guides

15. 📰 NEWS — Diaspora News Feed  [Route: /news]
    Trigger words: news, what's happening in Kosovo, latest, lajme

━━━ RESPONSE RULES FOR SITE LINKS ━━━

- When you identify a relevant platform feature for what the user needs, ALWAYS mention it and include the path.
- For LIVE features: offer to search/show data directly.
- For READY features: explain the value warmly and encourage them to visit. Use language like:
  "The [Feature] portal on KahKosova has exactly this → [route path]"
  "I can't pull live data on this yet, but the team's built the [Feature] section for exactly that: [route path]"
- Never say "I can't help with that" — if it's on the platform in any form, mention it.
- If multiple features are relevant, mention them all naturally in conversation.
`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface IntentResult {
  intent: string;
  query: {
    type: string | null;
    origin: string | null;
    destination: string | null;
    category: string | null;
    sort: string | null;
  };
  showCards: boolean;
  isGreeting: boolean;
  siteRoutes: SiteRoute[];
}

export interface SiteRoute {
  path: string;
  label: string;
  reason: string;
  isLive: boolean;
}

// ─── Site Route Definitions (mirrors App.tsx exactly) ─────────────────────────
const SITE_ROUTES: Record<string, Omit<SiteRoute, 'reason'>> = {
  transporti:    { path: '/transporti',            label: '✈️ Transport Search',       isLive: true  },
  agjenti:       { path: '/agjenti',               label: '🤖 AI Agent Dashboard',     isLive: true  },
  landLeasing:   { path: '/land-leasing',          label: '🌍 Land & Property',        isLive: false },
  giftGateway:   { path: '/services/gift-gateway', label: '🎁 Gift Gateway',           isLive: false },
  formBuilder:   { path: '/services/form-builder', label: '📄 Form Builder',           isLive: false },
  checklist:     { path: '/services/checklist',    label: '✅ Return Checklist',        isLive: false },
  construction:  { path: '/ndertimi',              label: '🔩 Construction Portal',    isLive: false },
  healthcare:    { path: '/shendeti',              label: '💊 Healthcare',             isLive: false },
  investments:   { path: '/investime',             label: '📈 Investment Offers',      isLive: false },
  businesses:    { path: '/bizneset',              label: '🏢 Business Directory',     isLive: false },
  genealogy:     { path: '/gjurmet',              label: '🌳 Family Genealogy',        isLive: false },
  border:        { path: '/kufiri',               label: '🛂 Border Crossing Status', isLive: false },
  language:      { path: '/gjuha-jone',           label: '🗣️ Albanian Language Hub',  isLive: false },
  news:          { path: '/news',                  label: '📰 Diaspora News',          isLive: false },
  services:      { path: '/services',             label: '🔧 All Services',           isLive: false },
};

class CustomerConcierge {
  name: string = 'CustomerConcierge';
  status: string = 'idle';
  sessions: Map<string, any[]> = new Map();
  ai: Groq | null = null;
  initialized: boolean = false;

  log(msg: string) {
    console.log(`[${this.name}] ${msg}`);
  }

  initialize() {
    if (this.initialized) return;

    const key = process.env.GROQ_API_KEY;
    if (key && key !== 'your_groq_api_key_here') {
      try {
        this.ai = new Groq({ apiKey: key });
        this.log('Groq initialized (using llama-3.3-70b-versatile)');
      } catch (err) {
        this.log(`Groq init failed: ${err instanceof Error ? err.message : String(err)}. Using keyword-only mode.`);
        this.ai = null;
      }
    } else {
      this.log('No Groq API key — keyword-only mode active');
    }

    this.initialized = true;
  }

  // ─── System Prompt Builder ───────────────────────────────────────────────
  // Token-efficient: inject trip data only when relevant, manifest always included
  getSystemPrompt(tripDataContext: string, isTravelQuery: boolean) {
    const travelSection = isTravelQuery
      ? `\n[LIVE TRIP DATA FROM AEROSCOUT & TRANSITSCOUT]\n${tripDataContext}\nWhen referencing these, quote real prices from the data above. Never fabricate fares.`
      : '';

    return `[ROLE & PERSONA]
You are the KahKosova AI — the operating system of a diaspora superplatform for Albanians and Kosovars living across Europe.
You act like a highly intelligent, well-traveled, authentic FRIEND. Not a chatbot. Not a customer service rep.
Warm. Casual. Real. You switch naturally between English, Albanian (Shqip), and German based on what the user is writing.
No corporate voice. No "How may I assist you today?" Just real talk, like texting a smart friend who knows everything.

[YOU ARE NOT JUST A TRAVEL BOT]
You are the guide to EVERYTHING on KahKosova. Travel is one thing you do. But you also help with:
land back home, sending gifts to family, building a house remotely, healthcare for parents, tracing ancestry,
legal documents, investments, border crossing info, Albanian language for kids, business discovery.

When a user needs something — no matter how vague — you identify the right part of the platform and point them there.
NEVER say "I don't know" or "I can't help with that" if there's a relevant platform feature.
Instead, be the friend who says: "Bro, KahKosova literally has a section for exactly that."

[OPEN CONVERSATION]
You are unrestricted. Talk about sports, coding, philosophy, relationships — whatever. Engage like a real person.
If someone is joking, joke back. If they're stressed, be empathetic. If they need technical detail, go deep.
${CAPABILITIES_MANIFEST}
[FORMATTING RULES]
- Use markdown: **bold** for emphasis, bullet lists for options
- When referencing a platform feature, mention the path naturally: "the Land Portal (/land-leasing)"
- For LIVE features: offer to search/show. For READY features: explain the value, provide the path
- Keep responses under 250 words unless they ask for a lot of detail
- Emojis: use casually, not excessively${travelSection}`;
  }

  // ─── Expanded Intent Extraction ───────────────────────────────────────────
  // Now covers 5 intent families: travel, site-navigation, civic, emotional, general
  extractIntent(message: string): IntentResult {
    const msg = message.toLowerCase().trim();
    const siteRoutes: SiteRoute[] = [];

    const result: IntentResult = {
      intent: 'general',
      query: { type: null, origin: null, destination: null, category: null, sort: null },
      showCards: false,
      isGreeting: false,
      siteRoutes: [],
    };

    // ── Greeting detection ──
    if (/^(hi|hello|hey|greetings|what'?s up|yo|salut|pershendetje|miredita|sup|howdy|alo|tungjatjeta|mirëdita|hallo|guten tag)/i.test(msg)) {
      result.intent = 'greeting';
      result.isGreeting = true;
      return result;
    }

    // ━━━ TRAVEL INTENTS (LIVE data available) ━━━

    const isFlight = /flight|fly|plane|airport|airline|fluturim|avion/i.test(msg);
    const isBus = /bus|coach|transit|autobus|transport|ride|linja/i.test(msg);
    const isTravelGeneral = /travel|trip|journey|udhëtim|udhëtoj|cheap.*to|how.*get to|rrugë/i.test(msg);

    if (isFlight || isBus || isTravelGeneral) {
      if (isFlight) { result.query.type = 'flight'; result.intent = 'search_flights'; }
      else if (isBus) { result.query.type = 'bus'; result.intent = 'search_buses'; }
      else { result.query.type = 'both'; result.intent = 'search_flights'; }

      if (/cheap|cheapest|budget|affordable|low.?cost|lowest.?price|save|lirë|lire|ekonomik/i.test(msg)) {
        result.query.category = 'best'; result.query.sort = 'price';
      }
      if (/fast|fastest|quick|shortest|express|shkurt/i.test(msg)) {
        result.query.category = 'shortest'; result.query.sort = 'duration';
      }
      if (/best|optimal|recommended|top|value|mirë/i.test(msg)) {
        result.query.category = 'best'; result.query.sort = 'value';
      }

      const cities = Object.keys(config.cityToAirport);
      for (const city of cities) {
        if (msg.includes(city.toLowerCase())) {
          const fromIdx = msg.indexOf('from');
          const cityIdx = msg.indexOf(city.toLowerCase());
          if (fromIdx !== -1 && fromIdx < cityIdx) {
            result.query.origin = city;
          } else {
            result.query.destination = city;
          }
        }
      }
      if (!result.query.origin) result.query.origin = 'Prishtina';
      result.showCards = true;

      if (/best.?date|when.*travel|when.*go|when.*fly|when.*cheap|best.?time|kur.*lirë/i.test(msg)) {
        result.intent = 'best_dates';
      }
    }

    // ━━━ PROPERTY / LAND INTENTS ━━━
    if (/land|property|prona|tokë|field|house|villa|real estate|lease|menaxho|i have land|trua|pasurie/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.landLeasing, reason: 'Manage or find land/property in Kosovo' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ GIFTS / FAMILY SUPPORT INTENTS ━━━
    if (/send|gift|food|present|family|mom|grandmother|birthday|holiday|I want to send|dërgoj|dhuratë|ushqim|festë|nënë/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.giftGateway, reason: 'Send gifts or food to family in Kosovo' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ DOCUMENTS / LEGAL / BUREAUCRACY INTENTS ━━━
    if (/document|form|legal|paperwork|notary|certificate|contract|power of attorney|official|letër|formular|bürokratie|dokument/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.formBuilder, reason: 'Generate bilingual legal documents for Kosovo institutions' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ RETURNING TO KOSOVO INTENTS ━━━
    if (/returning|going back|moving back|return to kosov|I want to come home|kthehem|checklist|prepare to return/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.checklist, reason: 'Step-by-step guide for returning to Kosovo' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ CONSTRUCTION INTENTS ━━━
    if (/build|construction|contractor|architect|renovate|building project|ndërtim|ndërtoj|shtëpi|house project/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.construction, reason: 'Vetted contractors and remote project monitoring' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ HEALTHCARE INTENTS ━━━
    if (/doctor|clinic|hospital|sick|health|medical|appointment|checkup|shëndet|mjek|i need a doctor|familja|klinikë/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.healthcare, reason: 'Book medical appointments for family in Kosovo' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ INVESTMENT INTENTS ━━━
    if (/invest|investment|roi|returns|business opportunity|passive income|bereqet|startup kosov|economy/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.investments, reason: 'Verified Kosovo investment opportunities with ROI' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ BUSINESS DIRECTORY INTENTS ━━━
    if (/albanian business|kosovo restaurant|diaspora business|gastronomy|find a business|restaurant near|biznese/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.businesses, reason: 'Verified Albanian/Kosovar businesses in Europe' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ GENEALOGY / FAMILY HISTORY INTENTS ━━━
    if (/grandfather|family history|ancestors|roots|village|where.*family.*from|genealogy|surname.*kosov|history.*family|rrënjë|trashëgimi|gjyshi|gjyshja|fshati|prejardhja/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.genealogy, reason: 'Search Ottoman & modern Kosovo family archives' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ BORDER CROSSING INTENTS ━━━
    if (/border|crossing|waiting time|kufiri|customs|entering kosov|passport|how long.*border/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.border, reason: 'Live Kosovo border crossing wait times' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ LANGUAGE INTENTS ━━━
    if (/albanian language|my kids.*albanian|language learning|gjuha shqipe|teach albanian|dialect|shqip|speak albanian/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.language, reason: 'Albanian language resources and dialect guides' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ NEWS INTENTS ━━━
    if (/news|what'?s happening|latest kosov|lajme|diaspora news/i.test(msg)) {
      siteRoutes.push({ ...SITE_ROUTES.news, reason: 'Latest news from Kosovo and the diaspora' });
      result.intent = result.intent === 'general' ? 'site_guidance' : result.intent;
    }

    // ━━━ BROAD HELP INTENTS — suggest multiple features ━━━
    if (/help.*family|support.*family|help.*back home|what can you do|what.*platform|njoftoni|si mund|how can I help/i.test(msg)) {
      siteRoutes.push(
        { ...SITE_ROUTES.giftGateway, reason: 'Send gifts and food' },
        { ...SITE_ROUTES.healthcare, reason: 'Book medical care for family' },
        { ...SITE_ROUTES.landLeasing, reason: 'Manage property remotely' },
        { ...SITE_ROUTES.formBuilder, reason: 'Handle documents from abroad' },
      );
      result.intent = 'site_overview';
    }

    result.siteRoutes = siteRoutes;
    return result;
  }

  // ─── MongoDB Trip Query ────────────────────────────────────────────────────
  async queryTrips(intentData: IntentResult) {
    const db = getDb();
    const collection = db.collection('trips');
    const q = intentData.query;
    const now = new Date();

    const filter: any = { departure_time: { $gte: now } };

    if (q.type && q.type !== 'both') filter.type = q.type;

    if (q.destination) {
      filter.$or = [
        { destination: q.destination },
        { destinationCity: q.destination },
        { destination: config.cityToAirport[q.destination] || q.destination },
      ];
    }

    if (q.origin) {
      const originConditions = [
        { origin: q.origin },
        { originCity: q.origin },
        { origin: config.cityToAirport[q.origin] || q.origin },
      ];
      if (filter.$or) {
        const destConditions = filter.$or;
        delete filter.$or;
        filter.$and = [{ $or: destConditions }, { $or: originConditions }];
      } else {
        filter.$or = originConditions;
      }
    }

    if (q.category && q.category !== 'cheapest') {
      filter.category_tag = q.category;
    }

    let sort: any = {};
    if (q.sort === 'price') sort = { price: 1 };
    else if (q.sort === 'duration') sort = q.category === 'longest' ? { duration: -1 } : { duration: 1 };
    else sort = { price: 1 };

    return collection.find(filter).sort(sort).limit(6).toArray();
  }

  // ─── Best Dates Query ─────────────────────────────────────────────────────
  async getBestDates(origin: string, destination: string | null) {
    const db = getDb();
    const collection = db.collection('trips');
    const now = new Date();
    const filter: any = { departure_time: { $gte: now }, best_dates: { $exists: true, $ne: [] } };

    if (destination) {
      filter.$or = [
        { destination },
        { destinationCity: destination },
        { destination: config.cityToAirport[destination] || destination },
      ];
    }

    const trips = await collection.find(filter).limit(10).toArray();
    const allDates = trips.flatMap((t: any) => t.best_dates || []);
    const uniqueDates = [...new Set(allDates.map((d: Date) => new Date(d).toISOString().split('T')[0]))].sort();
    return uniqueDates.slice(0, 5);
  }

  // ─── Trip Context Formatter (token-efficient) ─────────────────────────────
  formatTripsForContext(trips: any[]) {
    if (!trips || trips.length === 0) {
      return 'TRIP DATA: No matching trips found for this query.';
    }
    const lines = trips.map((t, i) => {
      const type = t.type === 'flight' ? '✈️' : '🚌';
      const origin = t.originCity || t.origin;
      const dest = t.destinationCity || t.destination;
      const operator = t.airline_or_operator || 'Unknown';
      const duration = t.duration ? `${Math.floor(t.duration / 60)}h${t.duration % 60}m` : '?';
      const layovers = t.layovers === 0 ? 'Direct' : `${t.layovers} stop(s)`;
      const dep = t.departure_time ? new Date(t.departure_time).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A';
      const tag = t.category_tag ? ` [${t.category_tag.toUpperCase()}]` : '';
      return `${i + 1}. ${type} ${origin}→${dest} | ${operator} | €${t.price} | ${duration} | ${layovers} | ${dep}${tag}`;
    });
    return `TRIP DATA:\n${lines.join('\n')}`;
  }

  // ─── Groq LLM Call ────────────────────────────────────────────────────────
  async callGroq(sessionId: string, userMessage: string, tripContext: string, isTravelQuery: boolean) {
    if (!this.ai) return null;

    try {
      const history = this.sessions.get(sessionId) || [];
      const systemPrompt = this.getSystemPrompt(tripContext, isTravelQuery);
      const messages: any[] = [{ role: 'system', content: systemPrompt }];

      // Last 8 turns only — keeps tokens manageable
      for (const turn of history.slice(-8)) {
        messages.push(turn);
      }
      messages.push({ role: 'user', content: userMessage });

      const completion = await this.ai.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 512,   // reduced from 1024 — friend texts, not essays
        temperature: 0.82,
        top_p: 0.9,
      });

      const text = completion.choices[0].message?.content;
      if (!text) return null;

      history.push({ role: 'user', content: userMessage });
      history.push({ role: 'assistant', content: text });
      this.sessions.set(sessionId, history.slice(-20));

      return text;
    } catch (err) {
      this.log(`Groq API error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  }

  // ─── Fallback Message Generator ───────────────────────────────────────────
  generateFallbackMessage(intentData: IntentResult, trips: any[], bestDates: string[]) {
    if (intentData.isGreeting) {
      return `Hey! 👋 What's good? I'm the KahKosova AI — your all-in-one guide for the Albanian diaspora.\n\nI can help with **way more than travel**:\n\n✈️ Flights & buses from Prishtina/Tirana/Skopje\n🌍 Managing land or property back home (/land-leasing)\n🎁 Sending gifts to family (/services/gift-gateway)\n📄 Legal documents & forms (/services/form-builder)\n🌳 Tracing your family roots (/gjurmet)\n💊 Healthcare for family in Kosovo (/shendeti)\n\nWhat do you need? 🙌`;
    }

    if (intentData.intent === 'site_overview' || intentData.siteRoutes.length >= 3) {
      const links = intentData.siteRoutes.map(r => `• **${r.label}** → \`${r.path}\``).join('\n');
      return `The platform has exactly what you need! Here's what's relevant:\n\n${links}\n\nJust say which one and I'll tell you more — or tap any of those links directly! 🙌`;
    }

    if (intentData.siteRoutes.length > 0) {
      const route = intentData.siteRoutes[0];
      const statusNote = route.isLive
        ? `I've got live data for this — check it out at **${route.path}**!`
        : `The **${route.label}** section has this covered → \`${route.path}\`\n_(Full UI is ready, live data coming soon)_`;
      return `${route.reason}!\n\n${statusNote}`;
    }

    if (intentData.showCards && intentData.query.destination) {
      const type = intentData.query.type === 'bus' ? 'bus routes' : 'flights';
      let msg = `🔍 Searched for ${type} to **${intentData.query.destination}**:`;
      if (bestDates.length > 0) msg += `\n\n📅 **Best travel dates:** ${bestDates.join(', ')}`;
      if (!trips || trips.length === 0) msg += '\n\n😔 No exact matches right now — scouts refresh every few hours!';
      return msg;
    }

    return "I can help you with travel, property, healthcare, gifts, documents, family roots, and more — just ask! 💪";
  }

  // ─── Main Chat Handler ────────────────────────────────────────────────────
  async chat(sessionId: string, userMessage: string) {
    this.initialize();
    this.status = 'processing';

    try {
      const intentData = this.extractIntent(userMessage);
      let cards: any[] = [];
      let bestDates: string[] = [];

      const isTravelQuery = ['search_flights', 'search_buses', 'best_dates'].includes(intentData.intent);

      // Only query MongoDB if we need trip data
      if (!intentData.isGreeting && isTravelQuery) {
        cards = await this.queryTrips(intentData);
      }

      if (intentData.intent === 'best_dates') {
        bestDates = await this.getBestDates(
          intentData.query.origin || 'Prishtina',
          intentData.query.destination,
        );
      }

      const tripContext = isTravelQuery ? this.formatTripsForContext(cards) : '';
      let responseMessage: string | null = null;

      if (this.ai) {
        responseMessage = await this.callGroq(sessionId, userMessage, tripContext, isTravelQuery);
      }

      if (!responseMessage) {
        responseMessage = this.generateFallbackMessage(intentData, cards, bestDates);
      } else {
        // Append best dates if Groq didn't include them naturally
        if (bestDates.length > 0 && !responseMessage.includes('dates')) {
          responseMessage += `\n\n📅 **Best travel dates:** ${bestDates.join(', ')}`;
        }
        // Append no-results hint
        if (isTravelQuery && cards.length === 0 && !responseMessage.includes('no match') && !responseMessage.includes('not found')) {
          responseMessage += '\n\n😔 No exact matches right now — our scouts refresh every few hours. Try back soon!';
        }
      }

      this.status = 'idle';
      return {
        message: responseMessage,
        intent: intentData.intent,
        siteRoutes: intentData.siteRoutes,    // NEW: deep-links for the frontend to render
        cards: cards.map(t => ({
          id: t._id,
          type: t.type,
          origin: t.originCity || t.origin,
          destination: t.destinationCity || t.destination,
          operator: t.airline_or_operator,
          price: t.price,
          currency: t.currency,
          duration: t.duration,
          layovers: t.layovers,
          departureTime: t.departure_time,
          arrivalTime: t.arrival_time,
          categoryTag: t.category_tag,
          link: t.link,
        })),
        bestDates,
        timestamp: new Date(),
      };

    } catch (err) {
      this.status = 'error';
      this.log(`Chat error: ${err instanceof Error ? err.message : String(err)}`);
      return {
        message: "Something blipped on my end 😅 Try again in a sec! In the meantime, the AI dashboards below have live data.",
        intent: 'error',
        siteRoutes: [],
        cards: [],
        bestDates: [],
        timestamp: new Date(),
      };
    }
  }

  getStatus() {
    return {
      name: this.name,
      status: this.status,
      activeSessions: this.sessions.size,
      aiEnabled: !!this.ai,
    };
  }
}

export default new CustomerConcierge();
