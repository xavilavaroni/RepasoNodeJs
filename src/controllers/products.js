const {obtainProduct, createProduct, putProduct, obtainList, destroyP} = require('../services/products');

const getProductId = async (req,res,next) => {
    const id = req.params.id;
    try {
        const product = await obtainProduct(id);
        res.status(200).send(product);
    } catch (error) {
        res.status(202);
    }
}

const getList = async (req,res,next) => {
    try {
        const list = await obtainList();
        res.status(200).send(list);
    } catch (error) {
        res.status(202);
    }
}

const createProductc = async(req,res,next) => {
    try {
        const id = await createProduct(req.body);
        res.status(200).send({id: id});
    } catch (error) {
        res.status(422).send("No se ha podido crear");
        next();
    }
    next();
}
 

const putProd  = async(req,res,next) => {
    const updateProd = await putProduct(req.id, req.body);
    if (updateProd) {
        res.status(200).send(updateProd);
    } else {
        res.status(200).send('NOT-UPDATED')
    }
    next();
}

const deleteProd = async(req, res, next) =>{
    const deleted = await destroyP(req.params.id);
    if (deleted) {
        res.status(200).send("DELETED");
    } else {
        res.status(200).send("NOT_DELETED");
    }
}

module.exports = {
    putProd,
    createProductc,
    getProductId,
    getList,
    deleteProd
};