import { connect, close } from './db';

const airlines = [
  { name: 'Wizz Air', code: 'W6', logo: 'wizzair' },
  { name: 'Turkish Airlines', code: 'TK', logo: 'turkish' },
  { name: 'Pegasus', code: 'PC', logo: 'pegasus' },
  { name: 'Austrian Airlines', code: 'OS', logo: 'austrian' },
  { name: 'Lufthansa', code: 'LH', logo: 'lufthansa' },
  { name: 'Swiss', code: 'LX', logo: 'swiss' },
  { name: 'Air Albania', code: 'ZB', logo: 'airalbania' },
  { name: 'EasyJet', code: 'U2', logo: 'easyjet' },
  { name: 'Ryanair', code: 'FR', logo: 'ryanair' },
  { name: 'Eurowings', code: 'EW', logo: 'eurowings' },
];

const busOperators = [
  { name: 'FlixBus', logo: 'flixbus' },
  { name: 'Sharr Travel', logo: 'sharrtravel' },
  { name: 'Kosova Liner', logo: 'kosovaliner' },
  { name: 'Dardania Bus', logo: 'dardaniabus' },
  { name: 'Albi Travel', logo: 'albitravel' },
  { name: 'Eurolines', logo: 'eurolines' },
  { name: 'VIP Express', logo: 'vipexpress' },
];

const flightRoutes = [
  { origin: 'PRN', originCity: 'Prishtina', dest: 'VIE', destCity: 'Vienna', basePriceMin: 45, basePriceMax: 180, durationMin: 95, durationMax: 140 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'MUC', destCity: 'Munich', basePriceMin: 50, basePriceMax: 200, durationMin: 120, durationMax: 180 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'ZRH', destCity: 'Zurich', basePriceMin: 55, basePriceMax: 220, durationMin: 130, durationMax: 190 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'IST', destCity: 'Istanbul', basePriceMin: 40, basePriceMax: 160, durationMin: 100, durationMax: 150 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'LHR', destCity: 'London', basePriceMin: 70, basePriceMax: 350, durationMin: 180, durationMax: 320 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'FCO', destCity: 'Rome', basePriceMin: 55, basePriceMax: 250, durationMin: 130, durationMax: 240 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'BER', destCity: 'Berlin', basePriceMin: 50, basePriceMax: 190, durationMin: 140, durationMax: 240 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'DUS', destCity: 'Dusseldorf', basePriceMin: 45, basePriceMax: 175, durationMin: 160, durationMax: 220 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'STR', destCity: 'Stuttgart', basePriceMin: 45, basePriceMax: 170, durationMin: 150, durationMax: 210 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'FRA', destCity: 'Frankfurt', basePriceMin: 50, basePriceMax: 185, durationMin: 155, durationMax: 230 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'GVA', destCity: 'Geneva', basePriceMin: 55, basePriceMax: 210, durationMin: 140, durationMax: 200 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'CPH', destCity: 'Copenhagen', basePriceMin: 60, basePriceMax: 240, durationMin: 180, durationMax: 310 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'BRU', destCity: 'Brussels', basePriceMin: 55, basePriceMax: 200, durationMin: 170, durationMax: 280 },
  { origin: 'PRN', originCity: 'Prishtina', dest: 'AMS', destCity: 'Amsterdam', basePriceMin: 60, basePriceMax: 230, durationMin: 175, durationMax: 290 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'FCO', destCity: 'Rome', basePriceMin: 30, basePriceMax: 140, durationMin: 90, durationMax: 120 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'MXP', destCity: 'Milan', basePriceMin: 35, basePriceMax: 150, durationMin: 100, durationMax: 140 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'IST', destCity: 'Istanbul', basePriceMin: 40, basePriceMax: 170, durationMin: 110, durationMax: 160 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'LHR', destCity: 'London', basePriceMin: 60, basePriceMax: 300, durationMin: 185, durationMax: 330 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'VIE', destCity: 'Vienna', basePriceMin: 50, basePriceMax: 190, durationMin: 100, durationMax: 150 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'ATH', destCity: 'Athens', basePriceMin: 40, basePriceMax: 160, durationMin: 70, durationMax: 110 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'BER', destCity: 'Berlin', basePriceMin: 55, basePriceMax: 220, durationMin: 160, durationMax: 270 },
  { origin: 'TIA', originCity: 'Tirana', dest: 'MUC', destCity: 'Munich', basePriceMin: 50, basePriceMax: 200, durationMin: 130, durationMax: 190 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'VIE', destCity: 'Vienna', basePriceMin: 40, basePriceMax: 165, durationMin: 105, durationMax: 150 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'IST', destCity: 'Istanbul', basePriceMin: 35, basePriceMax: 140, durationMin: 95, durationMax: 130 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'MUC', destCity: 'Munich', basePriceMin: 45, basePriceMax: 185, durationMin: 135, durationMax: 200 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'BER', destCity: 'Berlin', basePriceMin: 50, basePriceMax: 195, durationMin: 150, durationMax: 250 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'ZRH', destCity: 'Zurich', basePriceMin: 50, basePriceMax: 200, durationMin: 130, durationMax: 190 },
  { origin: 'SKP', originCity: 'Skopje', dest: 'LHR', destCity: 'London', basePriceMin: 65, basePriceMax: 310, durationMin: 190, durationMax: 340 },
];

const busRouteDefinitions = [
  { from: 'Prishtina', to: 'Munich', basePriceMin: 45, basePriceMax: 85, durationMin: 780, durationMax: 960 },
  { from: 'Prishtina', to: 'Vienna', basePriceMin: 35, basePriceMax: 65, durationMin: 600, durationMax: 780 },
  { from: 'Prishtina', to: 'Zurich', basePriceMin: 50, basePriceMax: 90, durationMin: 900, durationMax: 1080 },
  { from: 'Prishtina', to: 'Stuttgart', basePriceMin: 45, basePriceMax: 80, durationMin: 840, durationMax: 1020 },
  { from: 'Prishtina', to: 'Frankfurt', basePriceMin: 50, basePriceMax: 85, durationMin: 900, durationMax: 1080 },
  { from: 'Prishtina', to: 'Dusseldorf', basePriceMin: 55, basePriceMax: 95, durationMin: 960, durationMax: 1200 },
  { from: 'Prishtina', to: 'Hamburg', basePriceMin: 60, basePriceMax: 100, durationMin: 1080, durationMax: 1320 },
  { from: 'Prishtina', to: 'Tirana', basePriceMin: 8, basePriceMax: 15, durationMin: 180, durationMax: 270 },
  { from: 'Prishtina', to: 'Skopje', basePriceMin: 5, basePriceMax: 12, durationMin: 90, durationMax: 150 },
  { from: 'Tirana', to: 'Rome', basePriceMin: 55, basePriceMax: 95, durationMin: 720, durationMax: 900 },
  { from: 'Tirana', to: 'Milan', basePriceMin: 50, basePriceMax: 90, durationMin: 660, durationMax: 840 },
  { from: 'Tirana', to: 'Athens', basePriceMin: 25, basePriceMax: 50, durationMin: 420, durationMax: 540 },
  { from: 'Tirana', to: 'Thessaloniki', basePriceMin: 20, basePriceMax: 40, durationMin: 300, durationMax: 420 },
  { from: 'Skopje', to: 'Belgrade', basePriceMin: 12, basePriceMax: 25, durationMin: 300, durationMax: 390 },
  { from: 'Skopje', to: 'Sofia', basePriceMin: 10, basePriceMax: 22, durationMin: 270, durationMax: 360 },
  { from: 'Prizren', to: 'Tirana', basePriceMin: 8, basePriceMax: 18, durationMin: 180, durationMax: 300 },
  { from: 'Peja', to: 'Munich', basePriceMin: 50, basePriceMax: 90, durationMin: 840, durationMax: 1020 },
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFlights(): any[] {
  const trips = [];
  for (const route of flightRoutes) {
    const flightCount = randomBetween(3, 5);
    for (let i = 0; i < flightCount; i++) {
      const dayOffset = randomBetween(1, 30);
      const airline = randomElement(airlines);
      const price = randomBetween(route.basePriceMin, route.basePriceMax);
      const duration = randomBetween(route.durationMin, route.durationMax);
      const layovers = duration > 200 ? randomBetween(1, 2) : (Math.random() > 0.7 ? 1 : 0);

      const dep = new Date();
      dep.setDate(dep.getDate() + dayOffset);
      dep.setHours(randomBetween(5, 22), randomBetween(0, 59), 0, 0);

      const arr = new Date(dep.getTime() + duration * 60 * 1000);

      trips.push({
        type: 'flight',
        origin: route.origin,
        originCity: route.originCity,
        destination: route.dest,
        destinationCity: route.destCity,
        airline_or_operator: airline.name,
        airline_code: airline.code,
        operator_logo: airline.logo,
        price,
        currency: 'EUR',
        duration,
        layovers,
        departure_time: dep,
        arrival_time: arr,
        category_tag: null,
        best_dates: [],
        link: `https://www.google.com/travel/flights?q=flights+from+${route.originCity}+to+${route.destCity}`,
        source: 'seed',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  return trips;
}

export function generateBuses(): any[] {
  const trips = [];
  for (const route of busRouteDefinitions) {
    const busCount = randomBetween(2, 4);
    for (let i = 0; i < busCount; i++) {
      const dayOffset = randomBetween(1, 14);
      const operator = randomElement(busOperators);
      const price = randomBetween(route.basePriceMin, route.basePriceMax);
      const duration = randomBetween(route.durationMin, route.durationMax);

      const dep = new Date();
      dep.setDate(dep.getDate() + dayOffset);
      dep.setHours(randomBetween(5, 23), randomBetween(0, 59), 0, 0);

      const arr = new Date(dep.getTime() + duration * 60 * 1000);

      trips.push({
        type: 'bus',
        origin: route.from,
        originCity: route.from,
        destination: route.to,
        destinationCity: route.to,
        airline_or_operator: operator.name,
        operator_logo: operator.logo,
        price,
        currency: 'EUR',
        duration,
        layovers: 0,
        departure_time: dep,
        arrival_time: arr,
        category_tag: null,
        best_dates: [],
        link: `https://www.google.com/maps/dir/${route.from}/${route.to}`,
        source: 'seed',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  return trips;
}

export async function seed() {
  console.log('[SEED] Starting seed data generation...');
  const db = await connect();
  const collection = db.collection('trips');

  await collection.deleteMany({ source: 'seed' });
  console.log('[SEED] Cleared previous seed data');

  const flights = generateFlights();
  const buses = generateBuses();
  const allTrips = [...flights, ...buses];

  await collection.insertMany(allTrips);
  console.log(`[SEED] Inserted ${flights.length} flights and ${buses.length} bus routes (${allTrips.length} total)`);

  await close();
  console.log('[SEED] Done!');
}
