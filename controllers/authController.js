import fastify from "fastify";
import userModel from "../models/user";


export const createAccount = async (request, payload, reply) => {
    console.log(request.body);
    // console.log(payload);
    const { email, username, password } = request.body;

    const user = await userModel.findOne({
        email,
    })
    console.log(user);

    if (user) {
        return {
            ok: false,
            msg: "해당 유저가 이미 가입되어있습니다.",
            status: 400
        }
    }

    if (!user) {
        const result = await userModel.create({
            email,
            username,
            password
        });
        console.log(result);

        if (result) {
            return {
                ok: true,
                msg: "가입 성공.",
                status: 200
            }
        }
    }


}

export const postLogin = async (request, payload, reply) => {
    try {
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
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
};
