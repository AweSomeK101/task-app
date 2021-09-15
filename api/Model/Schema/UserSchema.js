const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: Number,
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }]
}, {timestamps: true});

UserSchema.virtual("tasks", {
    ref: "tasks",
    localField: "_id",
    foreignField: "owner"
})

UserSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 9);
    }
    next();
})


UserSchema.statics.findByCred = async (email, password) => {
    try {
        const user = await User.findOne({email});
        if(!user) throw {message: "user not found", code: 404};
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw {message: "wrong password", code: 401};
        return user;
    } catch (error) {
        console.log("find by cred=> ", error);
        throw error;
    }
}

UserSchema.methods.generateJWT = async function(){
    const token = await jwt.sign({_id: this._id.toString()}, process.env.SALT);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}

UserSchema.methods.toJson = function() {
    let user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}

const User = mongoose.model("users", UserSchema);

module.exports = User;