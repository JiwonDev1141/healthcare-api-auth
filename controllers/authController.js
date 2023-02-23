import fastify from "fastify";
import userModel from "../models/user";
import bcrypt from "bcrypt";

export const createAccount = async (request, payload, reply) => {
    console.log(request.body);
    // console.log(payload);
    const { email, username, password, password2 } = request.body;

    if (password !== password2) {
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

        const { email, password } = request.body;

        const user = await userModel.findOne({
            email
        })

        const checkPW = bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                console.log(error);
                return false
            }
            if (isMatch) {
                return true
            }
        })

        if (checkPW) {
            // 토큰 발급 후
            const token = fastify.jwt.sign({
                data: {
                    email,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h', algorithm: 'HS256' });

            // client 에 송신
            if (token) {
                reply.send({
                    ok: true,
                    msg: "로그인 완료: 토큰 발급",
                    token
                });
            }

        }
    }
    catch (err) {
        reply.send(err);
    }
};
