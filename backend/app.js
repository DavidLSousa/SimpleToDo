import Fastify from 'fastify'
import fastifyFormbody from '@fastify/formbody'
import { routes } from './router.js'
import dotenv from 'dotenv'
import knex from './db.js'

dotenv.config()

const fastify = Fastify({
  logger: true
})

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