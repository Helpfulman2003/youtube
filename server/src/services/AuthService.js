const User = require("../models/User");
const createError = require("../error");
const bcrypt = require("bcrypt");

const authService = {
  signup: async (body, next) => {
    try {
      const { email, password } = body;
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        next(createError(409, "The email is already"));
      }
      const hash = bcrypt.hashSync(password, 10);
      return {
        ...body,
        password: hash,
      };
    } catch (error) {
      next(error);
    }
  },
  signin: async (body, next) => {
    try {
      const { email, password } = body
      const check = await User.findOne({ email });
      if (!check) {
        next(createError(404, "The email is not defined"));
      } else {
        const comparePassword = bcrypt.compareSync(password, check.password);
        if (!comparePassword) {
          next(createError(401, "The password or user is incorrect"));
        }
        const user = await User.findOne({ email }, "-password");
        return {
          user
        };
      }
    } catch (error) {
      next(error);
    }
  }
  
};

module.exports = authService;
