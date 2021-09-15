const express = require("express");
const auth = require("../Middleware/authentication");
const taskCtrl = require("../Controller/taskController");

const taskRouter = express.Router();

taskRouter.route("/")
    .post(auth, taskCtrl.createTask)
    .get(auth, taskCtrl.getTask);

taskRouter.route("/:id")
    .put(auth, taskCtrl.updateTask)
    .delete(auth, taskCtrl.deleteTask);

module.exports = taskRouter