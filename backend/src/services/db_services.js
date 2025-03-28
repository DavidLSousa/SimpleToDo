
const getAllToDos = async (db) => {
  return await db('todos').select('*')
}

const delToDo = async (db, currentId) => {
  return await db('todos').where('id', currentId).del();
}

const updateToDo = async (db, currentId, completed) => {
  const isCompleted = completed === 'true';
  return await db('todos').where('id', currentId).update({ completed: isCompleted });
}

const insertToDO = async (db, title) => {
  return await db('todos').insert({ title, completed: false });
}

export {
  getAllToDos,
  delToDo,
  updateToDo,
  insertToDO,
}