const jwt = require("jsonwebtoken");
const createError = require("../error");
require("dotenv").config()

const middlewareController = {
    verifyToken: async(req, res, next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
                if(err) {
                    next(createError(403, "Token is not valid"))
                }
                req.user = user // bao gồm id của _id của người dùng
                next()
            })
        }else {
            next(createError(401, "Use are not authenticated"))
        }
    }
}

module.exports = middlewareController