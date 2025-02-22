const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
   
  name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  mobile:{
      type:Number,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  is_admin:{
      type:Boolean,
      required:true
  },
  is_varified:{
      type:Boolean,
      default:false
  },
  createdAt:{
    type:Date,
    default:new Date()
  },
  is_block:{
    type:Boolean,
    default:false
  }   
});

module.exports = mongoose.model('User',userSchema);