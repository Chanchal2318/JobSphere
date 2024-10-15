const mongoose = require("mongoose");
async function connection(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection created");
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connection;