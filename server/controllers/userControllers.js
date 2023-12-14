const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res, next) => {
  try {
    const { FullName, email, mobile, password } = req.body;
    const encryption = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const user = await User.create({
        FullName,
        email,
        mobile,
        password: encryption,
      });
      const jwttoken = jwt.sign(user.toJSON(), process.env.JWT, {
        expiresIn: 60 * 30,
      });
      res.status(201);
      res.json({
        status: 'Success',
        message: 'User created successfully',
        recruiterName: user.FullName,
        jwttoken,
      });
    } else {
      res.status(409);
      res.json({
        status: 'Failed',
        message: 'User already exist',
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      status: 'Failed',
      message: 'something went wrong',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let PasswordMatch = await bcrypt.compare(password, user.password);
      if (PasswordMatch) {
        const jwttoken = jwt.sign(user.toJSON(), process.env.JWT, {
          expiresIn: 60 * 30,
        });
        res.json({
          status: 'Success',
          message: 'User LoggedIn Successfully',
          recruiterName: user.FullName,
          jwttoken,
        });
      } else {
        res.json({
          status: 'Failed',
          message: 'Invaild credentials',
        });
      }
    } else {
      res.json({
        status: 'Failed',
        message: 'User Not Found',
      });
    }
  } catch (error) {
    res.json({
      status: 'Failed',
      message: 'Invaild credentials',
    });
  }
};

module.exports = { register, login };
