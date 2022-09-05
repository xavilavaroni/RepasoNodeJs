const {v4} = require('uuid');
const {addProduct, selectProductByPK, updateProduct, allPorducts, deleteProd} = require('../providers/products');

const createProduct = async (body) => {
    const product = {
        Id: v4(),
        Name: body.Name,
        Price: body.Price
    };

    const idCreated = await addProduct(product);

    if(!idCreated) {
        throw new Error('PRODUCT-NOT-CREATED');
    }

    return idCreated;
}

const obtainList = async ()=>{
    const productList = await allPorducts();

    if(productList.error){
        throw new Error('GENERAL-ERROR');
    }

    if(productList.lenght = 0){
        throw new Error('LIST-NOT-FOUND');
    }
    return productList
}

const obtainProduct = async (idProduct) => {
    const product = await selectProductByPK(idProduct);

    if(product.error){
        throw new Error('GENERAL-ERROR');
    }

    if(!product){
        throw new Error('PORDUCT-NOT-FOUND');
    }

    return product;
}

const putProduct = async (id, body) => {
    const updatedProduct = await updateProduct(id);

    return updatedProduct;
}

const destroyP = async (idProduct) => {
    const product = await deleteProd(idProduct);

    return product;
} 
module.exports = {
    obtainProduct,
    putProduct,
    createProduct,
    obtainList,
    destroyP
}