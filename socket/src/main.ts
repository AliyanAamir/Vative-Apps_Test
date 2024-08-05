import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis, RedisOptions } from 'ioredis';

const app = express();
const port = 3000;

const server = http.createServer(app);

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

const pubClient = new Redis('redis://localhost:6379', redisOptions);
const subClient = pubClient.duplicate();

const io = new Server(server);
io.adapter(createAdapter(pubClient, subClient));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

let userCount = 0;

io.on('connection', (socket) => {
  userCount += 1;
  const username = `User ${userCount}`;
  console.log(`${username} connected: ${socket.id}`);

  socket.on('message', (msg) => {
    const message = { username, text: msg };
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected: ${socket.id}`);

    userCount -= 1;
  });
});

server.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
