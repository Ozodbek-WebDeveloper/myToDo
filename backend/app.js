const express = require("express");
require("dotenv").config();
const { default: mongose } = require("mongoose");
const todoRoute = require("./src/router/todo.route");
const authRoute = require("./src/router/auth.route");
const authMiddleware = require("./src/middleware/auth.Middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRoute);
app.use("/api", authMiddleware.verifyToken, todoRoute);

const port = process.env.PORT;
const start = async () => {
  try {
    await mongose
      .connect(process.env.DB_URL)
      .then(console.log("connection db"));
    app.listen(
      port,
      console.log(`my todo list server listen http://localhost:${port}`)
    );
  } catch (error) {
    console.log(`Error connection with db ${error}`);
  }
};

start();
