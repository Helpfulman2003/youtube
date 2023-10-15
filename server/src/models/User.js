const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String },
  img: { type: String },
  subscribers: {
    type: Number,
    default: 0,
  },// số lượng người đăng kí
  subscribedUsers: {type: [mongoose.Schema.ObjectId]},// id của cái kênh mình đăng kí
  fromGoogle: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User
