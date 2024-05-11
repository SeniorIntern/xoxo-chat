import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { serverConfig } from './config';
import v1Routes from './routers/v1Routes';

dotenv.config();
const app = express();

import { createServer } from 'http';
import { Server } from 'socket.io';

const corsOption = {
  origin: 'http://localhost:3000', // Your client's origin
  credentials: true // This line allows credentials
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOption
});

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
  res.status(200).json('API is live');
});
app.use('/api/v1', v1Routes);

type SocketPaylod = {
  conversationId: string;
  sender: string;
  text: string;
  date: Date
};

io.on('connection', (socket) => {
  console.log(`node- connected: ${socket.id}`);

  socket.on('send', (data: SocketPaylod) => {
    console.log('incoming payload= ', data);
    // emit to corresponding conversation
    io.emit(data.conversationId, data);
  });
});

const { PORT, URI } = serverConfig;
mongoose
  .connect(URI)
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`Server started on port ${PORT}...`)
    )
  );
