
import db from '../../db.js';
export default class UserDbService {
  constructor() {
    this.db = db
  }

  async saveUser(newUser) {
    await db('users').insert(newUser);
  }

  async getUserByEmail(email) {
    return await db('users').where('email', email)
  }

  async checkUserExists(email) {
    const user =  await db('users').where('email', email).first();
    return !!user;
  }
}