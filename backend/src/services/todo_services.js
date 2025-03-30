import db from '../../db.js';
export default class ToDoServices {

  constructor() {
    this.db = db
  }

  getUserToDos = async (userId) => {
    return await this.db('todos')
      .where('user_id', userId)
      .select('*')
  }
  
  delToDo = async (toDoId, userId) => {
    return await this.db('todos')
      .where({ id: toDoId, user_id: userId })
      .del();
  }
  
  updateToDo = async (toDoId, currentStatus, userId) => {
    return await this.db('todos')
      .where({ id: toDoId, user_id: userId })
      .update({ completed: !currentStatus });
  }
  
  insertToDO = async (title, userId) => {
    await this.db('todos').insert({ title, user_id: userId,  completed: false });

    return await this.db('todos').where('user_id', userId).select('*');
  }
}
