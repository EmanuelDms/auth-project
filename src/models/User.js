import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

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

UserSchema.pre('save', async function () {
  this.password = await bcryptjs.hash(this.password, 8)
});

UserSchema.methods.show = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    deleted: this.deleted,
  }
}

export default model("User", UserSchema);