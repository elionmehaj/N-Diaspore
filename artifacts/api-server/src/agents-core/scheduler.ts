import cron from 'node-cron';
import config from './config';
import aeroScout from './aeroScout';
import transitScout from './transitScout';
import routeAnalyzer from './routeAnalyzer';
import type { Server } from 'socket.io';

let io: Server | null = null;

function notifyClients(event: string, data: any) {
  if (io) {
    io.emit(event, data);
  }
}

export function start(socketIo: Server) {
  io = socketIo;

  console.log('[SCHEDULER] Registering cron jobs...');

  cron.schedule(config.schedules.aeroScout, async () => {
    console.log('[SCHEDULER] Running Aero Scout (cron)');
    const result = await aeroScout.run();
    if (result.success) {
      console.log('[SCHEDULER] Running Route Analyzer after Aero Scout');
      await routeAnalyzer.run();
      notifyClients('data-refreshed', { agent: 'aeroScout', timestamp: new Date() });
    }
  });

  cron.schedule(config.schedules.transitScout, async () => {
    console.log('[SCHEDULER] Running Transit Scout (cron)');
    const result = await transitScout.run();
    if (result.success) {
      console.log('[SCHEDULER] Running Route Analyzer after Transit Scout');
      await routeAnalyzer.run();
      notifyClients('data-refreshed', { agent: 'transitScout', timestamp: new Date() });
    }
  });

  console.log(`[SCHEDULER] Aero Scout: ${config.schedules.aeroScout}`);
  console.log(`[SCHEDULER] Transit Scout: ${config.schedules.transitScout}`);
}

export async function runInitial() {
  console.log('[SCHEDULER] Running initial agent pipeline...');

  try {
    const aeroResult = await aeroScout.run();
    console.log('[SCHEDULER] Aero Scout initial run:', aeroResult.success ? 'OK' : 'FAILED');

    const transitResult = await transitScout.run();
    console.log('[SCHEDULER] Transit Scout initial run:', transitResult.success ? 'OK' : 'FAILED');

    const analyzerResult = await routeAnalyzer.run();
    console.log('[SCHEDULER] Route Analyzer initial run:', analyzerResult.success ? 'OK' : 'FAILED');

    notifyClients('data-refreshed', { agent: 'initial', timestamp: new Date() });
    console.log('[SCHEDULER] Initial pipeline complete');
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[SCHEDULER] Initial pipeline error:', msg);
  }
}

export default { start, runInitial };
