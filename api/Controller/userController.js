const userDAO = require("../Model/userDAO");

class userCtrl {
    static async registerUser(req, res) {
        try {
            const data = await userDAO.createDocument(req.body);
            if(data && data.status) return res.status(400).send(data);
            res.status(201).send(data);
        } catch (error) {
            console.log("register user=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async loginUser(req, res) {
        // if(!req.body && !req.body.email && !req.body.password) return res.status(400).send(status: "error", message: "bad request")
        try {
            const data = await userDAO.generateToken(req.body.email, req.body.password);
            if(data && data.status){
                if(data.code) return res.status(data.code).send({status: data.status, message: data.message});
                throw new Error(data.message);
            } 
            res.send({token: data});
        } catch (error) {
            console.log("login user=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async logoutUser(req, res) {
        try {
            const data = await userDAO.removeToken(req.userData, req.userToken);
            if(data && data.status) return res.status(400).send(data);
            res.send();
        } catch (error) {
            console.log("logout user=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async updateUser(req, res) {
        try{
            const data = await userDAO.updateDocument(req.userData, req.body);
            if(data && data.status) return res.status(400).send(data);
            res.send();
        } catch (error) {
            console.log("update user=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }

    static async getUser(req, res) {
        try{
            res.send(req.userData.toJson());
        } catch (error) {
            console.log("get user=> ", error);
            res.status(500).send({status: "error", message: error.message});
        }
    }
}

module.exports = userCtrl;