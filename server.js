const express = require("express");
const cors = require("cors");
const userRouter = require("./api/Route/userRoute");
const taskRouter = require("./api/Route/taskRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);


module.exports = app;