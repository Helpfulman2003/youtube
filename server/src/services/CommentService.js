const Comment = require("../models/Comment");
const commentService = {
    addComment: async(userId, {text, videoId, parent_id}, next) => {
        try {
            const comment = await Comment.create({
                userId,
                videoId,
                parent_id,
                text,
            })
            return comment
        } catch (error) {
            next(error)
        }
    },
    deleteComment: async() => {

    },
    getComments: async(videoId, next) => {
        try {
            const allComment = await Comment.find({videoId})
            return allComment
        } catch (error) {
            next()
        }
    },
}