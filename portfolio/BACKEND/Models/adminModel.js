const mongoose = require("mongoose")
const adminLoginSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }

});
const adminLoginModel = new mongoose.model("adminLoginModel",adminLoginSchema)
module.exports = adminLoginModel;