const signupModel = require("../Models/signupModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const env = require("dotenv");
const adminLoginModel =  require("../Models/adminModel")
env.config();
const login = async (req, res) => {
  const { email, password } = req?.body;
  console.log(email,password)
  try {
    let authToken = null;
    let user = await signupModel.findOne({
      username: email,
    });
    if (user === null) {
      user = await signupModel.findOne({
        email: email,
      });
    }
    if (user === null) {
      await res?.status(404).send("User not found");
    }
    if (user != null) {
      let hashedPassword = user?.password;
      let passwordCompare = await bcryptjs.compare(password, hashedPassword);
      console.log(user)
      if (passwordCompare === true) {
        authToken = jwt.sign(
          {
            _id : user?._id,
            username: email,
            password: hashedPassword,
          },
          process.env.SECRET_KEY,
          {
            expiresIn:process.env.EXPIRES_IN_AUTH_TOKEN
          }
          
        );
        
      }
      if (passwordCompare === false) {
        res?.status(401).send("Incorrect Password");
      }

      if (passwordCompare === true && user != null) {
        res?.status(200).send({
          user:{
            _id : user?._id,
            username : user?.username,
            email : user?.email,
          },
          authToken: authToken,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
const signup = async (req, res) => {
  const { username, email, password } = req?.body;
  console.log(username,email,password)

  if (
    email === undefined ||
    username === undefined ||
    password === undefined
  ) {
    res?.status(400).send("Email Id , Username , Password required");
  } else if (email === undefined) {
    res?.status(400).send("Email Id Required");
  } else if (username === undefined) {
    res?.status(400).send("Username Required");
  } else if (password === undefined) {
    res?.status(400).send("Password Required");
  } else {
    let hashedPasswordPromise = bcryptjs.hash(
      password,
      parseInt(process.env.SALT)
    );
    let hp = await hashedPasswordPromise.then((result) => {
      return result;
    });
   
    try {
      let user = await signupModel.findOne({
        username: username,
      });
      if (user === null) {
        user = await signupModel.findOne({
          email: email,
        });
      }

      if (user === null) {
        const user = new signupModel({
          username: username,
          email: email,
          password: hp,
        }).save();
        let authToken = jwt.sign(
          {
            _id : user?._id,
            username: username,
            email: email,
            password: hp,
          },
          process.env.SECRET_KEY,
          {
            expiresIn:process.env.EXPIRES_IN_AUTH_TOKEN
          }
        );
        res?.status(200).send({
          user:{
            _id : user?._id,
            username : user?.username,
            email : user?.email,
          },
          authToken: authToken,
        });
      } else {
        res
          ?.status(409)
          .send("user already register With this username or email");
      }
    } catch (e) {
      console.log(e);
    }
  }
};
const forgetPassword = async (req,res)=>{
  //find the user in signup model 
  //if user not found the give 404 user not found
  //if user found then check current password hash equals to the database saved hashed password 
  //if match then update database saved hashed password with current password hash and send 200 OK Password Get Changed Successfully
  //if not match then give response current password not match give 401 unauthorize user response

  const {email, currentPassword, newPassword} = req?.body;
  try {
    const user = await signupModel.findOne({email})
    console.log(user)
    if(!user) return res.status(404).send("User not found")
    const comparedCurrentPassword = await bcryptjs.compare(currentPassword,user?.password);
    if(comparedCurrentPassword == true){
      let hashedPasswordPromise = bcryptjs.hash(
        newPassword,
        parseInt(process.env.SALT)
      );
      let newHashedPassword = await hashedPasswordPromise.then((result) => {
        return result;
      });
      await signupModel.findOneAndUpdate({email},{$set:{password:newHashedPassword}})
      return res.status(200).send("Password change successfully")

    }
    else{
      return res.status(401).send("Current password not matched with your previous password")
    }
  } catch (error) {
    console.log(error)
  }

}

const adminLogin = async(req,res)=>{
  const { email, password } = req?.body;
  console.log(email,password)
  try {
    let authToken = null;
    let user = await adminLoginModel.findOne({
      email: email,
    });
    
    if (user === null) {
      await res?.status(404).send("User not found");
    }
    if (user != null) {
      let hashedPassword = user?.password;
      let passwordCompare = await bcryptjs.compare(password, hashedPassword);
      console.log(user)
      if (passwordCompare === true) {
        authToken = jwt.sign(
          {
            _id : user?._id,
            adminLoginEmail: email,
            adminLoginPassword: hashedPassword,
          },
          process.env.SECRET_KEY,
          {
            expiresIn:process.env.EXPIRES_IN_AUTH_TOKEN
          }
          
        );
        
      }
      if (passwordCompare === false) {
        res?.status(401).send("Incorrect Password");
      }

      if (passwordCompare === true && user != null) {
        res?.status(200).send({
          user:{
            _id : user?._id,
            adminLoginEmail: email,
            adminLoginPassword: hashedPassword,
          },
          authToken: authToken,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = auth = {
  login,
  signup,
  forgetPassword,
  adminLogin
};
