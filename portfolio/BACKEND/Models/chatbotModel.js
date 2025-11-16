const mongoose = require("mongoose");
const chatbotSchema = new mongoose.Schema({
    
        icon : {
            type: String,
            require: true,
        },
        name :{
            type : String,
            require:true,
            unique:true,
        },
        backendUrl : {
            type:String,
            require:true,
        },
        frontendUrl : {
            type:String,
            require:true,
        },
        createdTime : {
            type : String,
            default : new Date(),
        },
        modifyTime : {
            type:String,
            default : new Date(),
        }
      
});

const chatbotModel = new mongoose.model("chatbotModel", chatbotSchema);
module.exports = chatbotModel;