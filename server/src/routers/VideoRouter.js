const express = require('express')
const videoController = require('../controllers/VideoController')
const middlewareController = require('../middleware/authMiddleware')
const videoRouter = express.Router()

videoRouter.post('/', /* middlewareController.verifyToken,*/videoController.addVideo)
videoRouter.put('/:id', /* middlewareController.verifyToken,*/ videoController.putVideo)
videoRouter.delete('/:id', /* middlewareController.verifyToken,*/ videoController.deleteVideo)
videoRouter.get('/find/:id', videoController.getVideo)
videoRouter.put('/view/:id', videoController.addView)
videoRouter.get('/trend', videoController.trend)
videoRouter.get('/random', videoController.random)
videoRouter.get('/sub',  /* middlewareController.verifyToken,*/ videoController.sub)
videoRouter.get('/search', videoController.search)

module.exports = videoRouter
