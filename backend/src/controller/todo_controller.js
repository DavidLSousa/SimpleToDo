
export default class ToDoController {
  constructor(TodoServices) {
    this.TodoServices = TodoServices
  }

  getToDos = async (request, reply) => {
    try {
      // Vai fazer essa busca com base nas tarefas daquele usuário;
      // const result = await this.TodoServices.getAllToDos();
      const result = await this.TodoServices.getUserToDos(request.user.id);
  
      return reply.send({ todos: result });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
  
  deleteToDo = async (request, reply) => {
    try {
      const { id } = request.params;
      await this.TodoServices.delToDo(id, request.user.id);
  
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
  
      await this.TodoServices.updateToDo(id, completed, request.user.id);
  
      return reply.send({ message: "ToDo updated" });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
  
  addToDo = async (request, reply) => {
    try {
      const { title } = request.body;
  
      await this.TodoServices.insertToDO(title, request.user.id);
  
      return reply.send({ message: "ToDo added" });
    } catch (error) {
      console.log(error.message)
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}