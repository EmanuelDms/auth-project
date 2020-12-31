import User from "../models/User";

class UserController {
  // Show information about a logged user
  async show(req, res){
    // Find a user by token
    const user = await User.findById(req.user);

    if(!user){
      return res.status(401).json({error: 'Only authenticated user can execute this actions'});
    }

    return res.json({user: user.show()});
  }

  // Create a new user
  async store(req, res){
    // Catch request body params
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    // Verifies if the email exists
    if (userExists) {
      return res.status(400).json({error: 'email already exists'});
    }

    // Commit a create
    const user = await User.create({
      name, email, password
    });

    return res.json({user:user.show()});
  }

  // Update a user
  async update(req, res){
    // Catch request body params
    const { name, email, password } = req.body;
    // Find a user by token
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(401).json({error: 'Only authenticated user can execute this actions'});
    }

    if (email && (email !== user.email)) {
      const userExists = await User.findOne({email});

      // Verifies if the email exists
      if (userExists) {
        return res.status(400).json({error: 'email already exists'});
      }
    }

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) user.password = password;

    // Commit update
    await user.save();

    return res.json({user: user.show()});
  }

  async delete(req, res){
    const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(401)
        .json({error: 'Only authenticated user can execute this actions'});
    }

    user.deleted = true;

    await user.save();

    return res.status(204).send();
  }
}

export default new UserController();