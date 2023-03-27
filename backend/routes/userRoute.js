const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;

  try {
   bcrypt.hash(password,3,async(err,hashed_password)=>{
         if(err){
          console.log(err)

         }else{
          const user=new UserModel({email,password:hashed_password,name,gender,age,city,is_married})
await user.save()
res.send("registration successful")

} 
   })
  } catch (err) {
    console.log({ "err":"something wrong not registered" });
  }
});
userRoute.post("/login", async (req, res) => {
  const { email,password } = req.body;

  try {
  const single_user= await UserModel.findOne({email})
  console.log(single_user)
  const fetch_password=single_user[0].password
   const token = fetch_password;
   res.send({ msg: `login succesfull,token:${token}` });  
//   bcrypt.compare(password,fetch_password,(err,res)=>{
//           if(res){
                   
                     
//           }else{
//     res.send({"msg":"something wrong"})
//           }
//   })
  } catch (err) {
    console.log({ err: "something wrong not login" });
    res.send({ msg: "something wrong" });
  }
});



module.exports={
          userRoute
}