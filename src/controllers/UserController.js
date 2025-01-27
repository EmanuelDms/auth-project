import User from "../models/User";

class UserController {

  // Create a new user
  async store(req, res){
    const { name, email, password } = req.body;

    const user = await User.create({
      name, email, password
    });

    return res.json(user);
  }

}

export default new UserController;