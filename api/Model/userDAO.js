const User = require("./Schema/UserSchema");

class userDAO {
    static async createDocument(body) {
        const user = new User(body);
        try {
            return await user.save();
        } catch (error) {
            console.log("create document=> ", error);
            return {status: "error", message: error.message};
        }
    }

    static async findOneDocument(id, token) {
        try {
            return await User.findOne({_id: id, "tokens.token": token});
        } catch (error) {
            console.log("create document=> ", error);
            return {status: "error", message: error.message};
        }
    }

    static async generateToken(email, password) {
        try {
            const user = await User.findByCred(email, password);
            const token = await user.generateJWT();
            return token;
        } catch (error) {
            console.log("generate token=> ", error);
            if(error.code) return {status: "error", ...error};
            return {status: "error", message: error.message};
        }
    }

    static async removeToken(user, token) {
        try {
            user.tokens = user.tokens.filter(tok=> tok.token!==token);
            await user.save();
        } catch (error) {
            console.log("remove token=> ", error);
            return {status: "error", message: error.message};
        }
    }

    static async updateDocument(user, body) {
        try {
            const allowed = ["name", "password", "phone"];
            allowed.forEach(allow => {
                if(body[allow]){
                    user[allow] = body[allow];
                }
            });
            await user.save();
        } catch (error) {
            console.log("remove token=> ", error);
            return {status: "error", message: error.message}; 
        }
    }

    static async readDocumentTask(user) {
        try {
            await user.populate("tasks");
            return user.tasks;
        } catch (error) {
            console.log("read document=> ", error);
            return {status: "error", message: error.message};
        }
    }
}

module.exports = userDAO;