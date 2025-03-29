
export default class ToDoController {
  constructor(TodoServices) {
    this.TodoServices = TodoServices
  }

  getToDos = async (request, reply) => {
    try {
      const result = await this.TodoServices.getAllToDos();
  
      return reply.send({ todos: result });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
  
  deleteToDo = async (request, reply) => {
    try {
      const { id } = request.params;
      await this.TodoServices.delToDo(id);
  
      return reply.send({ message: "ToDo deleted" });
  
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
  
  updateStatus = async (request, reply) => {7
    try {
      const { id } = request.params;
      const { completed } = request.query;
  
      await this.TodoServices.updateToDo(id, completed);
  
      return reply.send({ message: "ToDo updated" });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
  
  addToDo = async (request, reply) => {
    try {
      const { title } = request.body;
  
      await this.TodoServices.insertToDO(title);
  
      return reply.send({ message: "ToDo added" });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}