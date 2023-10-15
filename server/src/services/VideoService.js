const createError = require("../error");
const User = require("../models/User");
const Video = require("../models/Video");
const videoService = {
  addVideo: async (userId, body, next) => {
    try {
      const video = await Video.create({ ...body, userId});
      return video;
    } catch (error) {
      next(error);
    }
  },
  putVideo: async (userId, body, videoId, next) => {
    try {
      const video = await Video.findById(videoId);
      if (!video) {
        return next(createError(404, "Video not found!"));
      }
      if (userId == video.userId) {
        const updateVideo = await Video.findByIdAndUpdate(
          videoId,
          {
            $set: body,
          },
          { new: true }
        );
        return updateVideo;
      } else {
        return next(createError(403, "You can update only your video!"));
      }
    } catch (error) {
      return next(error);
    }
  },
  deleteVideo: async (userId, videoId, next) => {
    try {
      const video = Video.findById(videoId);
      if (!video) {
        return next(createError(404, "Video not found!"));
      }
      if (userId == video.userId) {
        await Video.findByIdAndDelete(videoId);
        return true;
      }
      return false;
    } catch (error) {
      next(error);
    }
  },
  getVideo: async (videoId, next) => {
    try {
      const video = await Video.findById(videoId);
      return video;
    } catch (error) {
      next(error);
    }
  },
  addView: async (videoId, next) => {
    try {
      const view = await Video.findByIdAndUpdate(videoId, {
        $inc: { views: 1 },
      });
      return true;
    } catch (error) {
      next(error);
    }
  },
  trend: async (next) => {
    try {
      const videoTrend = await Video.find({}).sort({ views: -1 });
      return videoTrend;
    } catch (error) {
      next(error);
    }
  },
  random: async (next) => {
    try {
      const videoRandom = await Video.aggregate([
        { $sample: { size: 40 } },
      ]);
      return videoRandom;
    } catch (error) {
      next(error);
    }
  },
  sub: async (userId, next) => {
    try {
      const user = await User.findById(userId)
      const subscribedUsers = user.subscribedUsers
      const list = await Promise.all(subscribedUsers.map(async (channel) => await Video.find({userId: channel})))
      return list.flat().sort((a, b) => b.createAt - a.createAt )
    } catch (error) {
      next(error)
    }
  },
  search: async (title) => {
    try {
      const search = await Video.find({
      title: { $regex: title, $options: "i" },
    }).limit(40);
      return search;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = videoService;
