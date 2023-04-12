const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
import db from './src/models/mysql/index.js';
import { Server } from "socket.io";

/* CONFIGURATION */
import app from './app.js';


/* MONGODB SETUP */
if (process.env.DB_TYPE == 'MONGO') {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MONGODB CONNECTED');
    })
    .catch((error) => {
      console.log('MONGODB NOT CONNECTED: ' + error);
    });
}
/* MYSQL SETUP */
if (process.env.DB_TYPE == 'MYSQL') {
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('MYSQL CONNECTED');
    })
    .catch((err) => {
      console.log('MYSQL NOT CONNECTED: ' + err.message);
    });
}

const server = app.listen(port, () => console.log(`http://localhost:${port}`));



const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});


