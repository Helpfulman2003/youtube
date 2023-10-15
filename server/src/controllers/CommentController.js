const commentController = {
    addComment: async(req, res, next) => {
        try {
            const userId = req.user.id
            const body = req.body // body ở đây bao gồm {text comment , parentId nếu comment cha thì parentId để, và videoId để biết là video nào ""}
            const comment = await commentService.addComment(userId, body, next)
            return res.status(200).json(comment)
        } catch (error) {
            next(error)
        }
    },
    deleteComment: async(req, res, next) => {

    },
    getComments: async(req, res, next) => {
        try {
            const videoId = req.params.videoId
            const allComment = await commentService.getComments(videoId, next) 
            return res.status(200).json(allComment)
        } catch (error) {
            next(error)
        }
    },
}

module.exports = commentController
