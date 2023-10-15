const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId},// id của người đăng video
    title: {type: String, require: true},
    desc: {type: String},
    imgUrl: {type: String},
    videoUrl: {type: String},
    views: {type: Number, default: 0},
    likes: {type: [mongoose.Schema.ObjectId]},// id của người thích video
    dislikes: {type: [mongoose.Schema.ObjectId]},
});

const Video = mongoose.model('Video', videoSchema)
module.exports = Video
