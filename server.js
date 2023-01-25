import Fastify from 'fastify';
import router from './routers/authRouter';
import fastifyJwt from '@fastify/jwt';

// Require the framework and instantiate it
const fastify = Fastify({ logger: true });

fastify.register(router);
fastify.register(fastifyJwt, {
  secret: 'supersecret'
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();