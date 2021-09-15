const Task = require("./Schema/TaskSchema");
const User = require("./Schema/UserSchema");

class taskDAO {
    static async createDocument(body, user) {
        try {
            const task = new Task({
                ...body,
                owner: user._id,
            });
            return await task.save();
        } catch (error) {
            console.log("create document=> ", error);
            return {status: "error", message: error.message};
        }
    }

    static async updateDocument(id, body) {
        try {
            const task = await Task.findByIdAndUpdate(id, body);
            return task;
        } catch (error) {
            console.log("read document=> ", error);
            return {status: "error", message: error.message};
        }
    }

    static async deleteDocument(id) {
        try {
            await Task.findByIdAndDelete(id);
        } catch (error) {
            console.log("read document=> ", error);
            return {status: "error", message: error.message};
        }
    }
}

module.exports = taskDAO;