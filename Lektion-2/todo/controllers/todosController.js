const router = require('express').Router()


router.get('/', (req, res) => {
  res.send('GET request')
})
router.post('/', (req, res) => {
  res.send('POST request')
})


module.exports = router