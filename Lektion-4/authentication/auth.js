const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretKey = process.env.SECRET_KEY

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })
}