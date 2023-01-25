import Fastify from 'fastify';
import router from './routers/globalRouter/first-route';

// Require the framework and instantiate it
const fastify = Fastify({ logger: true });

fastify.register(router);

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