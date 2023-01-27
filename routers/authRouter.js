import { postJoin, postLogin, verifyJwt } from "../controllers/authController";

async function routes(fastify, options) {

    // 회원가입 요청 API (Post)
    fastify.post('/user', postJoin);

    // 로그인한 유저가 요청 시 토큰 유효성 검증
    fastify.addHook("onRequest", verifyJwt);

    fastify.post('/login', postLogin);

}



export default routes;