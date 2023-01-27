import Fastify from 'fastify';
import router from './routers/authRouter';
import fastifyJwt from '@fastify/jwt';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Require the framework and instantiate it
const fastify = Fastify({ logger: true });

fastify.register(router);
fastify.register(fastifyJwt, {
  secret: 'supersecret'
});



const { PORT, MONGO_URI } = process.env;


// MongoDB 기본 세팅
const mongoClient = new MongoClient(MONGO_URI);

const dbInit = async () => {
  try {
    await mongoClient.connect();
    console.log("\x1b[33m MongoDB Connected! \x1b[0m");
    
  }
  catch (err) {
    console.log("mongoDB: " + err);
  }
}
/////

// Run the server!
const start = async () => {
  try {
    await dbInit();
    fastify.listen({ port: PORT });

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();