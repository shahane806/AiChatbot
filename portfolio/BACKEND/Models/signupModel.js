const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,

    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    SignUpTime : {
        type : String,
        default : new Date(),
    }
});
const signupModel = new mongoose.model("signupModel",signupSchema);
module.exports = signupModel;