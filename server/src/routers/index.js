const authRouter = require("./AuthRouter")
const commentRouter = require("./CommentRouter")
const userRouter = require("./UserRouter")
const videoRouter = require("./VideoRouter")

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/video', videoRouter)
    app.use('/api/comment', commentRouter)
}

module.exports = routes
