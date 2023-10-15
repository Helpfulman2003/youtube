const videoService = require("../services/VideoService")

const videoController = {
    addVideo: async(req, res, next) => {
        try {
            const newVideo = await videoService.addVideo(req.user.id, req.body, next)
            return res.status(200).json(newVideo)
        } catch (error) {
            next(error)
        }
    },
    putVideo: async(req, res, next) => {
        try {
            const videoId = req.params.id // id của video
            console.log(req.user.id, req.body);
            const videoUpdate = await videoService.putVideo(req.user.id, req.body, videoId, next)
            return res.status(200).json(videoUpdate)
        } catch (error) {
            next(error)
        }
    },
    deleteVideo: async(req, res, next) => {
        try {
            const videoId = req.params.id // id của video
            const videoDelete = await videoService.deleteVideo(req.user.id, videoId, next)
            if(videoDelete) {
                return res.status(200).json("The video has been deleted.")
            }else {
                next(createError(403, "You can delete only your video!"))
            }
        } catch (error) {
            next(error)
        }
    },
    getVideo: async(req, res, next) => {
        const videoId = req.params.id
        const video = await videoService.getVideo(videoId, next)
        return res.status(200).json(video)
    },
    addView: async(req, res, next) => {
        const videoId = req.params.id
        const view = await videoService.addView(videoId, next)
        return res.status(200).json("The view has been increased.")
    },
    trend: async(req, res, next) => {
        try {
            const videoTrend = await videoService.trend(next)
            return res.status(200).json(videoTrend)
        } catch (error) {
            next(error)
        }
    },
    random: async(req, res, next) => {
        try {
            const videoRandom = await videoService.random(next)
            return res.status(200).json(videoRandom)
        } catch (error) {
            next(error)
        }
    },
    sub: async(req, res, next) => {
        try {
            const list = await videoService.sub(req.user.id, next)
            return res.status(200).json(list)
        } catch (error) {
            next(error)
        }
    },
    search: async(req, res, next) => {
        try {
            const {title} = req.query
            const search = await videoService.search(title)
            return res.status(200).json(search)
        } catch (error) {
            next(error)
        }
    },
}

module.exports = videoController