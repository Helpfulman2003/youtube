const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId},// id của người đăng video
    videoId: {type: mongoose.Schema.ObjectId},// id của video
    text: {type: String}, // text comment
    // posted: {type: Date, default: Date.now}, // thời gian tạo comment
    parent_id: {type: mongoose.Schema.ObjectId, default: ''}, // id cha của comement cha còn _id là id của comment con
    comment_likes: {type: [mongoose.Schema.ObjectId]},
    comment_likeNumber: {type: Number, default: 0},
    // slug: {type: String}// combine giữa parent_id/_id của commnent
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
