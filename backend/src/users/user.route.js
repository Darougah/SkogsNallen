const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
// const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

//Register endpoint
router.post('/register', async(req, res)=>{
  try {
    const{username, email, password} = req.body
  const user = new User({email, username, password})
  await user.save()
  res.status(201).send({message: "User registered successfully!"})
  } catch (error) {
    console.log("Error registering user");
    res.status(500).send({message:"Error registering user"})
    
  }
})


//login user endpoint
router.post('/login' , async (req,res)=>{
const {email, password} = req.body;
const user = await User.findOne({email})
try {if(!user){
  return res.status(404).send({message:'User not found'})
}
const isMatch = await user.comparePassword(password)
  if(!isMatch){
    return res.status(401).send({message:'password not match'})
  }

  const token = await generateToken(user.id)
  // console.log("token",token)
  res.cookie('token',token, {
    httpOnly:true, 
    secure: true,
    sameSite: 'None'
  })

  res.status(200).send({message:"Logged in successfully", token,user :{
    id:user.id,
    email: user.email,
    username: user.username, 
    role:user.role,
    profileImage: user.profileImage,
    bio: user.bio,
    profession: user.profession
  }})
  
} catch (error) {
  console.log("Error logged in user");
  res.status(500).send({message:"Error logged in user"})
}

})


// //all users
// router.get("/users",verifyToken, async(req,res)=>{
// res.send({message: "Protected users"})
// })

module.exports= router;