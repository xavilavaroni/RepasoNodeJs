var express = require('express');
const { getProductId, createProductc, putProd, getList, deleteProd } = require('../controllers/products');
var router = express.Router();

// obtain list
router.get('/', getList);

// obtain datils of 1
router.get('/:id',getProductId );

// create a product
router.post('/create', createProductc);

// update one
router.put('/:id', putProd);

// delete one
router.delete('/:id', deleteProd);


module.exports = router;
