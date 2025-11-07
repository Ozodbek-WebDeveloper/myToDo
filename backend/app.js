const express = require("express");
const http = require('http')
const { Server } = require('socket.io')
require("dotenv").config();
const { default: mongose } = require("mongoose");
const todoRoute = require("./src/router/todo.route");
const authRoute = require("./src/router/auth.route");
const messageRoute = require('./src/router/message.route')
const fileupload = require("express-fileupload");
const authMiddleware = require("./src/middleware/auth.Middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const app = express();
const swaggerDocs = require("./swagger");
const messageService = require('./src/services/message.service')
//----------- middelware
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(fileupload());
app.use('/static', express.static(path.join(__dirname, 'src', 'static')));
swaggerDocs(app);
// routes
app.use("/api/auth", authRoute);
app.use("/api", authMiddleware.verifyToken, todoRoute);
app.use('/api/chat', authMiddleware.verifyToken, messageRoute)
//
const port = process.env.PORT || (process.env.NODE_ENV === 'dev' ? process.env.PORT_DEV : process.env.PORT_PROD);

const server = http.createServer(app)

// const io = new Server(server)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ["GET", "POST"],
    credentials: true
  }
})

messageService.initializeSocketIO(io)



const start = async () => {
  try {
    await mongose.connect(process.env.DB_URL_DEV);
    console.log("Connected to MongoDB");

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Error connection with db ${error}`);
  }
};

start();
