import { HexNumber, HexString, Transaction } from '@ckb-lumos/lumos';
import { WebSocket, WebSocketServer } from 'ws';
import { Worker, workerData } from 'worker_threads';

export function runWebsocket() {
  const port = process.env.WS_PORT!;
  const server = new WebSocketServer({ port: Number.parseInt(port) });
  console.log('success start websocket server');
  console.log(`listening ${port}`);

  const worker = new Worker(`${__dirname}/worker.js`, {
    workerData: {
      path: `${__dirname}/subscription.ts`,
    },
  });

  worker.on('message', async (value) => {
    for (const c of server.clients) {
      c.send(JSON.stringify(value));
    }
  });
}
