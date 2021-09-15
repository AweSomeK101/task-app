const mongoose = require("mongoose");
const app = require("./server.js");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
        console.log("Databse connected")
        app.listen(process.env.PORT, ()=> console.log("server started on port: "+ process.env.PORT))
    })
    .catch(err=>{
        console.log("Error in main", err);
        process.exit(1);
    })