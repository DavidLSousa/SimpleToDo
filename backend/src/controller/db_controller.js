import { getAllToDos, delToDo, updateToDo, insertToDO } from '../services/todo_db_services.js';

const getToDos = async (request, reply) => {
  try {
    const result = await getAllToDos(request.server.db);

    return reply.send({ todos: result });
  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteToDo = async (request, reply) => {
  try {
    const { id } = request.params;
    await delToDo(request.server.db, id);

    return reply.send({ message: "ToDo deleted" });

  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
};

const updateStatus = async (request, reply) => {7
  try {
    const { id } = request.params;
    const { completed } = request.query;

    await updateToDo(request.server.db, id, completed);

    return reply.send({ message: "ToDo updated" });
  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

const addToDo = async (request, reply) => {
  try {
    const { title } = request.body;

    await insertToDO(request.server.db, title);

    return reply.send({ message: "ToDo added" });
  } catch (error) {
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

export {
  deleteToDo,
  getToDos,
  updateStatus,
  addToDo
};
