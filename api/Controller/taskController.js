const taskDAO = require("../Model/taskDAO");
const userDAO = require("../Model/userDAO");

class taskCtrl {
    static async createTask(req, res) {
        try {
            const data = await taskDAO.createDocument(req.body, req.userData);
            if(data && data.status) return res.status(400).send(data);
            res.status(201).send(data);
        } catch (error) {
            console.log("create task=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async getTask(req, res) {
        try{
            const data = await userDAO.readDocumentTask(req.userData);
            if(data && data.status) return res.status(400).send(data);
            res.send(data);
        } catch(error) {
            console.log("get task=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async updateTask(req, res ){
        try{
            const data = await taskDAO.updateDocument(req.params.id, req.body);
            if(data && data.status) return res.status(400).send(data);
            res.send(data);
        } catch(error) {
            console.log("update task=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async deleteTask(req, res) {
        try{
            const data = await taskDAO.deleteDocument(req.params.id);
            if(data && data.status) return res.status(400).send(data);
            res.send();
        } catch(error) {
            console.log("delete task=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }
}

module.exports = taskCtrl;