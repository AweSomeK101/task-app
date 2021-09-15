const jwt = require("jsonwebtoken");
const userDAO = require("../Model/userDAO");

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded =  jwt.verify(token, process.env.SALT);
        const user = await userDAO.findOneDocument(decoded._id, token);
        if(!user || user.status) {
            throw new Error()
        }
        req.userData = user;
        req.userToken = token;
        next();
    } catch (e) {
        res.status(401).send({status: "error", message: "authentication error"});
    }
}

module.exports = auth;