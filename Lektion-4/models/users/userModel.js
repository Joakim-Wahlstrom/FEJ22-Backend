const User = require('./userSchema');
const bcrypt = require('bcrypt');
const auth = require('../../authentication/auth')

// Register a new user
exports.registerUser = (req, res) => {

  User.exists({ email: req.body.email }, (err, result) => {

    if(err) {
      return res.status(400).json({
        message: 'You made a bad request',
        err
      })
    }

    if(result) {
      return res.status(400).json({
        message: 'The email address is already taken'
      })
    }

    const salt = bcrypt.genSaltSync(10);

    bcrypt.hash(req.body.password, salt, (err, hash) => {

      if(err) {
        return res.status(500).json({
          message: 'Failed when encrypting the password',
          err
        })
      }

      User.create({
        firstName:      req.body.firstName,
        lastName:       req.body.lastName,
        email:          req.body.email,
        passwordHash:   hash,
      })
      .then(user => res.status(201).json({
        message: 'User was created successfully',
        token: auth.generateToken(user)
      }))
      .catch(err => res.status(500).json({
        message: 'Failed to create user',
        err
      }))
    })
  })
}

// Login a user

exports.loginUserWithEmailAndPassword = (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {

    if(err) {
      return res.status(400).json({
        message: 'You made a bad request',
        err
      })
    }

    if(!user) {
      return res.status(401).json({
        message: 'Incorrect credentials'
      })
    }

    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {

      if(err) {
        return res.status(500).json({
          message: 'Something went wrong when decrypting the password',
          err
        })
      }

      if(!result) {
        return res.status(401).json({
          message: 'Incorrect credentials'
        })
      }

      res.status(200).json({
        message: 'Authentication was successful',
        token: auth.generateToken(user)
      })

    })
  })
}