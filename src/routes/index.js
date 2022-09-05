var express = require('express');
const products = require('./products');
// const cart = require('./cart');


var router = express.Router();

router.use('/products', products);
// router.use('/cart', cart);




module.exports = router;