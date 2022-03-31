const Product = require('./productSchema');


//Get all products
exports.getProducts = async (req, res) => {

  try {
    const data = await Product.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      message: 'Something went wrong when fetching the products',
      err
    })
  }

}


//Get one product by id
exports.getProductById = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {
    if(err) {
      return res.status(400).json({
        message: 'You made a bad request',
        err
      })
    }

    if(!result) {
      return res.status(404).json({
        message: 'Ooops, this product does not exist'
      })
    }

    Product.findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({
        message: err.message || 'Internal server error'
      }))

  })

}

//Create new product
exports.createProduct = (req, res) => {

  Product.exists({ name: req.body.name }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        message: 'A product by that name already exists, please update product instead'
      })
    }


    // Produken finns inte - skapa en ny produkt

    Product.create({
      name:   req.body.name,
      short:  req.body.short,
      desc:   req.body.desc,
      price:  req.body.price,
      image:  req.body.image,
    })
    .then(data => {
      res.status(201).json({
        message: 'Product created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to create product',
        err
      })
    })


  })

}

//Update product
exports.updateProduct = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        message: 'You made a bad request',
        err
      })
    }

    if(!result) {
      return res.status(404).json({
        message: 'Ooops, this product does not exist'
      })
    }

    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          message: 'Product updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            message: 'A product by that name already exists',
            err
          })
        }

        res.status(500).json({
          message: 'Failed to update product',
          err
        })
      })

  })

}

//Delete product
exports.deleteProduct = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        message: 'You made a bad request',
        err
      })
    }

    if(!result) {
      return res.status(404).json({
        message: 'Ooops, this product does not exist'
      })
    }

    Product.findOneAndDelete({ _id: req.params.id })
      .then(data => res.status(200).json({
        message: 'Product deleted',
        data
      }))
      .catch(err => res.status(500).json({
        message: 'Failed to delete product',
        err
      }))

  })

}