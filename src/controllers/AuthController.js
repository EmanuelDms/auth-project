import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";

class AuthController{
  async store(req, res){
    // a output text
    let txt = 'Credentials does not match.';

    // get data of request body
    const { email, password } = req.body;

    // Search information about a user, using req.body email
    const user = await User.findOne({email});

    // if user doesn't exist, returns a message
    if (!user) {
      return res
        .status(400)
        .json({error: txt})
    }

    // Compares req.body password matches with database user password
    const checkPassword = await bcryptjs.compare(password, user.password);

    // if password doesn't match, returns a message
    if (!checkPassword) {
      return res
        .status(400)
        .json({error: txt});
    }

    // setting jsonwebtoken
    const { secret, expiresIn } = jwtConfig;

    // Set payload attribute (jsonwebtoken)
    const token = jwt.sign({}, secret, {
      // user id (string)
      subject:String(user._id),
      expiresIn
    });

    // return user and its token
    return res.json({user:user.show(), token})
  }
}

export default new AuthController();