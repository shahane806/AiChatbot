const jwt = require("jsonwebtoken");
const { isObjectIdOrHexString } = require("mongoose");
const firebase_admin = require("firebase-admin");
const env = require("dotenv");
env.config();

const SocketAuthCheck = async (socket, next) => {
  let _id = socket?.handshake?.auth?._id;
  let authtoken = socket?.handshake?.auth?.authtoken;
  if(_id == process.env.AI_TOKEN){
    next();
  }
  if (
    authtoken == null ||
    authtoken == undefined ||
    _id == null ||
    _id == undefined
  ) {
    ///
  } else {
    if (authtoken.startsWith("Bearer")) {
      authtoken = authtoken.split("Bearer")[1];
    }
    if (isObjectIdOrHexString(_id)) {
      //mongodb auth
      let decodeToken = jwt.decode(authtoken);
      // console.log(decodeToken)
      if (decodeToken?._id == _id) {
        next();
      } else {
        ////
      }
    } else {
      //firebase auth
      try{
        let decodeToken = await firebase_admin.auth().verifyIdToken(authtoken);
        if (_id == decodeToken?.uid) {
            next();
          } else {
            ////
          }
      }catch(error){
        console.assert("Error : ",error)
      }
     
    }
  }
};
module.exports = SocketAuthCheck;
