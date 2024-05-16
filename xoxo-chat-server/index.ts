import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { serverConfig } from './config';
import v1Routes from './routers/v1Routes';

dotenv.config();
const app = express();

const corsOption = {
  origin: 'http://localhost:3000', // client's origin
  credentials: true // allow credentials
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOption
});

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
);

app.get('/status', (req, res) => {
  res.status(200).json('API is live');
});
app.use('/api/v1', v1Routes);

type SocketPaylod = {
  conversationId: string;
  sender: string;
  text: string;
  date: Date;
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
