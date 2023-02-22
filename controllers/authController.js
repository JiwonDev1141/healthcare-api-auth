import fastify from "fastify";
import userModel from "../models/user";
import bcrypt from "bcrypt";


export const createAccount = async (request, payload, reply) => {
    console.log(request.body);
    // console.log(payload);
    const { email, username, password, password2 } = request.body;

    if(password !== password2) {
        return {
            ok: false,
            error: "비밀번호가 다릅니다.",
            status: 400
        }
    }
    

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
        // 새로운 계정 생성
        
        // 비밀번호 salt & hash 처리
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(password, salt);

        const result = await userModel.create({
            email,
            username,
            password: hashed
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
