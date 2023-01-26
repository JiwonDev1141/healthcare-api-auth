export const postJoin = async (request, payload, reply) => {
    console.log(payload)

    // 토큰 발급 후
    const token = fastify.jwt.sign({ payload });
    // client 에 송신
    reply.send({ token });
};

export const verifyJwt = async (request, reply) => {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
};