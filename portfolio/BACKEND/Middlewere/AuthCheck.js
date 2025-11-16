const jwt = require("jsonwebtoken");
const { isObjectIdOrHexString } = require("mongoose");
const firebase_admin = require("firebase-admin");
const env = require("dotenv");
env.config();
firebase_admin.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
})
const AuthCheck = async (req,res,next)=>{
   let _id = req?.headers?._id;
   let authToken = req?.headers?.authorization;
//    console.log(req?.headers)
   if(authToken == null || authToken == undefined || _id == null || _id == undefined){
    return res?.status(500).send("Access Denied")
   }
   else{
    if(authToken.startsWith("Bearer")){
        authToken = authToken.split("Bearer")[1];
    }
    if(isObjectIdOrHexString(_id)){
        //mongodb auth
        let decodeToken = jwt.decode(authToken);
        // console.log("DecodeToken",decodeToken)
        if(decodeToken?._id == _id){
            next();
        }else{
            return res?.status(401)?.send("Access Denied");
        }
    }
    else{
        //firebase auth
        let decodeToken = await firebase_admin.auth().verifyIdToken(authToken);
        if(_id == decodeToken?.uid){
            next()
        }else{
            return res?.status(401).send("Access Denied");
        }
     }
   }


    
}
module.exports = AuthCheck