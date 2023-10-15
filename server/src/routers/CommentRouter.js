const express = require("express");
const commentController = require("../controllers/CommentController");
const commentRouter = express.Router();
const middlewareController = require("../middleware/authMiddleware")

commentRouter.post("/", middlewareController.verifyToken, commentController.addComment);
commentRouter.delete("/:id", middlewareController.verifyToken, commentController.deleteComment);
commentRouter.get("/:videoId", middlewareController.verifyToken, commentController.getComments);

module.exports = commentRouter;
