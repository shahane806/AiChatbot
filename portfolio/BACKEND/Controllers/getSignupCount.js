const signupModel = require("../Models/signupModel")
const adminModel = require("../Models/adminModel")
const getUserSignupCount = async(req,res)=>{
    
    const count = await signupModel.find();
    return res?.send({count:count.length})
}
const getAdminSignupCount = async(req,res)=>{
    const count = await adminModel.find();
    return res?.send({count:count.length})
}
module.exports = {
    getUserSignupCount,
    getAdminSignupCount,
}