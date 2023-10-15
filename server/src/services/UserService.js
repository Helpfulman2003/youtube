const createError = require("../error");
const User = require("../models/User");
const Video = require("../models/Video");

const userService = {
  getUser: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      next(error);
    }
  },
  update: async (userId, reqUserID, body) => {
    try {
      if (userId === reqUserID) {
        const userUpdate = User.findByIdAndUpdate(
          userId,
          {
            $set: body,
          },
          {
            new: true,
          }
        );
        return userUpdate;
      } else {
        next(createError(403, "You can update only your account!"));
      }
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (userId, reqUserID) => {
    try {
        if (userId === reqUserID) {
          const userUpdate = User.findByIdAndDelete(
            userId,
          );
          return true;
        } else {
          next(createError(403, "You can delete only your account!"));
        }
      } catch (error) {
        next(error);
      }
  },
  subscriber: async (selfId, userId) => {
    try {
        await User.findByIdAndUpdate(selfId, {
            $push: {subscribedUsers: userId}
        }, {new: true})
        await User.findByIdAndUpdate(userId, {
            $inc: {subscribers: 1}
        })
        return true
    } catch (error) {
        next(error)
    }
  },
  unsubscriber: async (selfId, userId) => {
    try {
        await User.findByIdAndUpdate(selfId, {
            $pull: {subscribedUsers: userId}
        }, {new: true})
        await User.findByIdAndUpdate(userId, {
            $inc: {subscribers: -1}
        })
        return true
    } catch (error) {
        next(error)
    }
  },
  like: async (userId, videoId, next) => {
    try {
      const videoUpdateLike = await Video.findByIdAndUpdate(videoId, {
        $addToSet: {likes: userId},
        $pull: {dislikes: userId}
      }, {new: true})
      return true
    } catch (error) {
      next(error)
    }
  },
  dislike: async (userId, videoId, next) => {
   try {
    const videoUpdateDisLike = await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislikes: userId},
      $pull: {likes: userId}
    }, {new: true})
    return true
   } catch (error) {
      next(error)
   }
}
}
module.exports = userService;
