import WebSocket from 'ws';
import logger from '../helpers/logger';
import { IRating } from '../types/types';

const wssPort = process.env.WSS_PORT as string;
const wss = new WebSocket.Server({ port: parseInt(wssPort) });

wss.on('listening', () => {
  logger.log({
    level: 'info',
    message: `Websocket is running at ws://localhost:${wssPort}`,
  });
});

export const sendLastRatingsInfo = (ratings: IRating[]): void => {
  if (ratings.length > 0) {
    wss.clients.forEach(async (client) => {
      if (client.readyState === client.OPEN) {
        const lastRatings: IRating[] = ratings;
        client.send(JSON.stringify(lastRatings));
      }
    });
  }
};
