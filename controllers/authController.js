import fastify from "fastify";

export const postJoin = async (request, payload, reply) => {
    try {
        console.log(payload)
    
        // 토큰 발급 후
        const token = fastify.jwt.sign({ payload });
        // client 에 송신
        reply.send({ token });
    }
    catch (err) {
        reply.send(err);
    }
};

export const verifyJwt = async (request, reply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err);
    }
};

export const postLogin = async (request, reply) => {
    const token = fastify.jwt.get();
   
}