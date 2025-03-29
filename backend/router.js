import {
  getToDos,
  deleteToDo,
  updateStatus,
  addToDo,
} from "./src/controller/db_controller.js";

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

  // Database routes
  fastify.get("/todos", preHandler, getToDos);
  fastify.post("/todos", preHandler, addToDo);
  fastify.put("/todos/:id", preHandler, updateStatus);
  fastify.delete("/todos/:id", preHandler, deleteToDo);
}

export { routes };

/*
	[ ] Add middleware 
		[ ] Authentication middleware (JWT)
		[ ] Security  - XSS
*/
