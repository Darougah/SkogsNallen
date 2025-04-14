const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {type:String, require:true, unique:true},
  email: {type:String, require:true,unique:true },
  password: {type:String, require:true},
  role:{
    type:String, default: 'user'
  },
  profileImage: String,
  bio:{type:String, maxlenght:200},
  profession: String,
  createAt:{
    type: Date,
    default:Date.now
  }
});

//hash password

userSchema.pre('save', async function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword;
  next();
})

const User = new model('User', userSchema);
module.exports=User;