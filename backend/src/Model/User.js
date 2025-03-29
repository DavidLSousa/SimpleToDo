import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor({ id, name, password, email }) {
    this.id = uuidv4() || id; 
    this.name = name;
    this.password = password;
    this.email = email;
  }
}