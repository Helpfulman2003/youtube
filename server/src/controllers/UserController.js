const createError = require("../error")
const userService = require("../services/UserService")
const jwt = require("jsonwebtoken");

require('dotenv').config()
const userController = {
    getUser: async(req, res, next) => {
        try {
            const userId = req.params.id
            const user = await userService.getUser(userId)
            return res.status(200).json({
                user: user
            })
        } catch (error) {
            next(error)
        }
    },
    update: async(req, res, next) => {
        try {
            const userId = req.params.id
            const userUpdate = await userService.update(userId, req.user.id, req.body)
            return res.status(200).json(userUpdate)
        } catch (error) {
            next(error)
        }
    },
    deleteUser: async(req, res, next) => {
        try {
            const userId = req.params.id
            const userUpdate = await userService.deleteUser(userId, req.user.id)
            if(userUpdate)
                return res.status(200).json("User has been deleted.")
        } catch (error) {
            next(error)
        }
    },
    subscriber: async(req, res, next) => {
        try {
            const userId = req.params.id // id của thằng mà mình đăng kí lấy bỏ vào mảng đăng kí của mình
            const selfId = req.user.id // id của mình nè
            const subscriber = await userService.subscriber(selfId, userId)
            if(subscriber) {
                return res.status(200).json('Subscription successfull.')
            }else {
                next(createError(400,"Update failed"))
            }
        } catch (error) {
            next(error)
        }
    },
    unsubscriber: async(req, res, next) => {
        try {
            const userId = req.params.id // id của thằng mà mình đăng kí lấy bỏ vào mảng đăng kí của mình
            const selfId = req.user.id // id của mình nè
            const subscriber = await userService.unsubscriber(selfId, userId)
            if(subscriber) {
                return res.status(200).json('Unsubscription successfull.')
            }else {
                next(createError(400,"Update failed"))
            }
        } catch (error) {
            next(error)
        }
    },
    like: async(req, res, next) => {
        try {
            const like = await userService.like(req.user.id, req.params.id, next) // id của người dùng và id của video 
            return res.status(200).json("The video has been liked.")
        } catch (error) {
            next(error)
        }
    },
    dislike: async(req, res, next) => {
        try {
            const dislike = await userService.dislike(req.user.id, req.params.id, next) // id của người dùng và id của video 
            return res.status(200).json("The video has been disliked.")
        } catch (error) {
            next(error)
        }
    },
    refreshToken: async (req, res) => {
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return res.json({
            status: "ERR",
            message: "You are not athenticated",
          });
        }
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
          if (err) {
            return res.json({
              status: "ERROR",
              message: "Token is not valid",
            });
          }
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
          const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true, // Set to true if your server uses HTTPS
            path: '/',
            sameSite: 'strict',
          });
    
          return res.json({
            status: "OK",
            message: "Success",
            accessToken: accessToken,
          });
        });
      }
}

module.exports = userController