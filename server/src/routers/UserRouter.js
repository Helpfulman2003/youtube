const express = require('express')
const userController = require('../controllers/UserController')
const middlewareController = require('../middleware/authMiddleware')
const userRouter = express.Router()

userRouter.get('/find/:id', userController.getUser)
userRouter.put('/:id', middlewareController.verifyToken, userController.update)
userRouter.delete('/find/:id', userController.deleteUser)
//subscribe a user
userRouter.put('/sub/:id',middlewareController.verifyToken, userController.subscriber)
//unsubscribe a user
userRouter.put('/unsub/:id',middlewareController.verifyToken, userController.unsubscriber)

userRouter.put('/like/:id',middlewareController.verifyToken, userController.like)
userRouter.put('/dislike/:id',middlewareController.verifyToken, userController.dislike)
userRouter.post('/refreshtoken', userController.refreshToken)
module.exports = userRouter
