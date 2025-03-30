import Fastify from 'fastify'
import fastifyFormbody from '@fastify/formbody'
import cors from '@fastify/cors'

import { routes } from './router.js'
import dotenv from 'dotenv'
import knex from './db.js'

dotenv.config()

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: 'http://127.0.0.1:3002', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ["Authorization"],
});

fastify.register(fastifyFormbody);

fastify.decorate('db', knex)

fastify.register(routes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})