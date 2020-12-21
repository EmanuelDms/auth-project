import mongoose from 'mongoose';

class Database{
  constructor(){
    this.init();
  }

  init(){
    mongoose.set('useCreateIndex', true)

    mongoose.connect('mongodb://localhost/user',
      { useNewUrlParser: true, useUnifiedTopology: true },
      console.log('MongoDB connected')
    );
  }
}

export default new Database();