import mongoose, { mongo } from "mongoose";

class Database{
  constructor(){
    this.init();

  }

  init(){
    mongoose.connect('mongodb://localhost:27017/user', 
    { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
}

export default new Database();