const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretKey = process.env.SECRET_KEY

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' })
}

exports.verifyToken = (req, res, next) => {

  // Bearer <token>

  try {
    const token = req.headers.authorization.split(" ")[1]
    req.userData = jwt.verify(token, secretKey)
    next()
  }
  catch {
    return res.status(401).json({
      message: 'Access restricted! Please login'
    })
  }
}