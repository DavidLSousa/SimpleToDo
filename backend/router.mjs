export default async function routes(fastify, options) {
	fastify.get("/login", async (request, reply) => {
		
    return { teste: 'login ok' }
    
	});

	fastify.get("/logon", async (request, reply) => {
		
    return { teste: 'logon ok' }

	});
}
