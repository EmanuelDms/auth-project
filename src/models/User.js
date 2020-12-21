import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name:{
    type:String,
    required: true,
  },
  email:{
    type:String,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type:String,
    required: true,  
  },
  // When the user wants to delete your account
  deleted:{
    type: Boolean,
    default: false
  },
}, {
  // Create a datetime for registry, when it was created and modified
  timestamps: true
});

export default model("User", UserSchema);