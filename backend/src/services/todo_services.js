import db from '../../db.js';
export default class ToDoServices {

  constructor() {
    this.db = db
  }

  getAllToDos = async () => {
    return await this.db('todos').select('*')
  }
  
  delToDo = async (currentId) => {
    return await this.db('todos').where('id', currentId).del();
  }
  
  updateToDo = async (currentId, completed) => {
    const isCompleted = completed === 'true';
    return await this.db('todos').where('id', currentId).update({ completed: isCompleted });
  }
  
  insertToDO = async (title) => {
    return await this.db('todos').insert({ title, completed: false });
  }
}