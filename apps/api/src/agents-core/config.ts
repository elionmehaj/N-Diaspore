import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/kahkosova',
  groqApiKey: process.env.GROQ_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Airports we scout
  airports: ['PRN', 'TIA', 'SKP'],

  // Popular destinations from Balkan airports
  flightDestinations: [
    'VIE', 'MUC', 'ZRH', 'IST', 'LHR', 'FCO', 'BER', 'DUS',
    'GVA', 'CPH', 'BRU', 'AMS', 'STR', 'HAM', 'FRA', 'LJU',
    'ATH', 'SOF', 'BUD', 'WAW'
  ],

  // Bus route pairs for transit scout
  busRoutes: [
    { from: 'Prishtina', to: 'Munich', fromCountry: 'XK', toCountry: 'DE' },
    { from: 'Prishtina', to: 'Vienna', fromCountry: 'XK', toCountry: 'AT' },
    { from: 'Prishtina', to: 'Zurich', fromCountry: 'XK', toCountry: 'CH' },
    { from: 'Prishtina', to: 'Stuttgart', fromCountry: 'XK', toCountry: 'DE' },
    { from: 'Prishtina', to: 'Frankfurt', fromCountry: 'XK', toCountry: 'DE' },
    { from: 'Prishtina', to: 'Dusseldorf', fromCountry: 'XK', toCountry: 'DE' },
    { from: 'Prishtina', to: 'Hamburg', fromCountry: 'XK', toCountry: 'DE' },
    { from: 'Prishtina', to: 'Tirana', fromCountry: 'XK', toCountry: 'AL' },
    { from: 'Prishtina', to: 'Skopje', fromCountry: 'XK', toCountry: 'MK' },
    { from: 'Tirana', to: 'Rome', fromCountry: 'AL', toCountry: 'IT' },
    { from: 'Tirana', to: 'Milan', fromCountry: 'AL', toCountry: 'IT' },
    { from: 'Tirana', to: 'Athens', fromCountry: 'AL', toCountry: 'GR' },
    { from: 'Tirana', to: 'Thessaloniki', fromCountry: 'AL', toCountry: 'GR' },
    { from: 'Skopje', to: 'Belgrade', fromCountry: 'MK', toCountry: 'RS' },
    { from: 'Skopje', to: 'Sofia', fromCountry: 'MK', toCountry: 'BG' },
    { from: 'Prizren', to: 'Tirana', fromCountry: 'XK', toCountry: 'AL' },
    { from: 'Peja', to: 'Munich', fromCountry: 'XK', toCountry: 'DE' },
  ],

  // City name to airport IATA mapping
  cityToAirport: {
    'Prishtina': 'PRN', 'Tirana': 'TIA', 'Skopje': 'SKP',
    'Munich': 'MUC', 'Vienna': 'VIE', 'Zurich': 'ZRH',
    'Stuttgart': 'STR', 'Frankfurt': 'FRA', 'Dusseldorf': 'DUS',
    'Hamburg': 'HAM', 'Berlin': 'BER', 'Rome': 'FCO',
    'Milan': 'MXP', 'Istanbul': 'IST', 'London': 'LHR',
    'Athens': 'ATH', 'Sofia': 'SOF', 'Budapest': 'BUD',
    'Belgrade': 'BEG', 'Thessaloniki': 'SKG', 'Copenhagen': 'CPH',
    'Brussels': 'BRU', 'Amsterdam': 'AMS', 'Geneva': 'GVA',
    'Ljubljana': 'LJU', 'Warsaw': 'WAW', 'Prizren': 'PRN',
    'Peja': 'PRN'
  } as Record<string, string>,

  // Cron schedules
  schedules: {
    aeroScout: '0 */4 * * *',      // every 4 hours
    transitScout: '0 */12 * * *',   // every 12 hours
  }
};

export default config;
