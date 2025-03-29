import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../Model/User.js"; 

export default class AuthService { 

  constructor(userDbService) {
    this.userDbService = userDbService; 
  }

  async register(name, password, email) {

    try {
      const userExists = await this.userDbService.checkUserExists(email);

      if (userExists) throw new Error("User already exists");

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User( { name, password: hashPassword, email } );
      await this.userDbService.saveUser(newUser);

    } catch (error) {
      throw new Error("AuthService.register failed"); 
    }
  }


  async login(email, password) {
    try {
      const [ user ] = await this.userDbService.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) throw new Error("Invalid password");

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '300000' });

      return { user, token }

    } catch (error) {
      throw new Error("AuthService.login failed");
    }
  }

}