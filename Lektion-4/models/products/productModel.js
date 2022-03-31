const Product = require('./productSchema');


//Get all products

//Get one product by id

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


  })

}

//Update product

//Delete product