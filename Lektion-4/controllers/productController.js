const router = require('express').Router();
const productModel = require('../models/products/productModel')

//Get all products
router.get('/', productModel.getProducts);

//Get one product by id
router.get('/:id', productModel.getProductById);

//Create new product
router.post('/', productModel.createProduct);

//Update product
router.patch('/:id', productModel.updateProduct);
router.put('/:id', productModel.updateProduct);

//Delete product
router.delete('/:id', productModel.deleteProduct);

module.exports = router;