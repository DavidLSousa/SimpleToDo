import { getToDos, deleteToDo } from './src/controller/db_controller.js';
import { login, logon, logout } from './src/controller/auth_controller.js';

async function routes(fastify, options) {

	// Authentication routes
	fastify.post("/login", login);
	fastify.post("/logon", logon);
	fastify.post("/logout", logout);

	// Database routes
	fastify.get("/todos", getToDos);
	fastify.delete("/todos/:id", deleteToDo);

}

export { routes }

/*
	[ ] Add middleware 
		[ ] Authentication middleware (JWT)
*/ 