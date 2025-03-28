const getToDos = async (request, reply) => {

  return reply.send({ message: "ToDo list retrieved" });
};

const deleteToDo = async (request, reply) => {
  return reply.send({ message: "ToDo deleted" });
};

export {
  deleteToDo,
  getToDos,
};
