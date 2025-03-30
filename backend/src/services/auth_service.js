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

      if (userExists) return await this.userDbService.getUserByEmail(email);

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User( { name, password: hashPassword, email } );
      await this.userDbService.saveUser(newUser);

    } catch (error) {
      throw new Error(error.message + "AuthService.register failed"); 
    }
  }

  async login(email, password) {
    try {
      const [ user ] = await this.userDbService.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) throw new Error("Invalid password");

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return { user, token }

    } catch (error) {
      throw new Error(error.message + " - AuthService.login failed");
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) throw new Error("Invalid token");

      return await this.userDbService.getUserByEmail(decoded.email);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

}