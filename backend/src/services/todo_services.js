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
  
  delToDo = async (currentId, userId) => {
    return await this.db('todos')
      .where({ id: currentId, user_id: userId })
      .del();
  }
  
  updateToDo = async (currentId, completed, userId) => {
    const isCompleted = completed === 'true';
    return await this.db('todos')
      .where({ id: currentId, user_id: userId })
      .update({ completed: isCompleted });
  }
  
  insertToDO = async (title, userId) => {
    return await this.db('todos')
      .insert({ title, user_id: userId,  completed: false });
  }
}
