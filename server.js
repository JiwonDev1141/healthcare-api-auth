import Fastify from 'fastify';
import router from './routers/authRouter';
import fastifyJwt from '@fastify/jwt';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import fastifyHelmet from '@fastify/helmet';
import cors from "@fastify/cors";
import mongoose from "mongoose";

// 환경변수 (.env) 세팅
dotenv.config();

// Require the framework and instantiate it
const fastify = Fastify({ logger: true });

// cors + fastify 라우터 세팅
const setRouters = async () => {
  await fastify.register(cors, {

  });
  fastify.register(router);
}
setRouters();

fastify.register(fastifyJwt, {
  secret: 'supersecret'
});

// 기본 보안을 위한 설정: https://www.npmjs.com/package/helmet
fastify.register(fastifyHelmet);


const { PORT, MONGO_URI } = process.env;


// MongoDB 기본 세팅
// export const mongoClient = new MongoClient(MONGO_URI);


/////

// Run the server!
const start = async () => {
  try {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("\x1b[33m MongoDB Connected! \x1b[0m");
      fastify.listen({ port: PORT });
    })

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();