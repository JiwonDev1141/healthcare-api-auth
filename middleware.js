import jwt from "jsonwebtoken";

export const verifyJwt = (token) => {
    return jwt.verify(token, process.env.SECREY_KEY, function(err, decoded) {
        if (err) {
            return true
        }
        else {
            return false
        }
    })
}

