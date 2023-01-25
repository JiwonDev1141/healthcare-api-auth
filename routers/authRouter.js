async function routes (fastify, options) {
    fastify.post('/user', async (request, payload, reply) => {
        console.log(payload)
        const token = fastify.jwt.sign({ payload });
        reply.send({ token });
    })
}



export default routes;