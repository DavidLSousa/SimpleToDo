import ToDoController from "./src/controller/todo_controller.js";
import TodoServices from "./src/services/todo_services.js";
const toDoController = new ToDoController(new TodoServices());

import AuthController from "./src/controller/auth_controller.js";
import AuthService from "./src/services/auth_service.js";
import UserDbService from "./src/services/user_db_service.js";
const userDbService = new UserDbService();
const authService = new AuthService(userDbService);
const authController = new AuthController(authService);

import AuthMiddleware from "./src/middlewares/auth_middleware.js";
const authMiddleware = new AuthMiddleware(authService);

const preHandler = {
	preHandler: (request, reply, done) => { authMiddleware.verifyToken(request, reply, done);	}
}

async function routes(fastify) {
  // Authentication routes
  fastify.post("/register", (request, reply) => authController.register(request, reply) );
  fastify.post("/login", (request, reply) => authController.login(request, reply) );
  fastify.post("/logout", (request, reply) => authController.logout(request, reply) );

  fastify.post("/check-token", preHandler, (_, reply) => reply.code(200).send() );

  // Database routes
  fastify.get("/todos", preHandler, (request, reply) => toDoController.getToDos(request, reply) );
  fastify.post("/todos", preHandler, (request, reply) => toDoController.addToDo(request, reply) );
  fastify.put("/todos/:id", preHandler, (request, reply) => toDoController.updateStatus(request, reply) );
  fastify.delete("/todos/:id", preHandler, (request, reply) => toDoController.deleteToDo(request, reply) );
}

export { routes };

/*
	[ ] Add middleware 
		[ ] Authentication middleware (JWT)
		[ ] Security  - XSS
*/
