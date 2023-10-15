require("dotenv").config();
const authService = require("../services/AuthService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
    signup: async(req, res, next) => {
        try {
            const newUser = await authService.signup(req.body, next)
            const createUser = User.create(newUser)
            return res.status(200).send("User has been created")
        } catch (error) {
            next(error)
        }
    },
    signin: async(req, res, next) => {
        try {
            const email = req.body.email;
            const checkUser = await authService.signin(req.body, next)
            const accessToken = jwt.sign(
                { id: checkUser.user._id, email },
                process.env.ACCESS_TOKEN,
                { expiresIn: "10s" }
              );
              const refreshToken = jwt.sign(
                { id: checkUser.user._id, email},
                process.env.REFRESH_TOKEN,
                {
                  expiresIn: "365d",
                }
              );
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
              });
            return res.status(200).json({
                user: checkUser.user,
                accessToken: accessToken
            })
        } catch (error) {
            next(error)
        }
    },
    logout: async(req, res, next) => {
        
    },
};

module.exports = authController
