const {Product} = require('../models')
const {Op} = require('sequelize');
const { restart } = require('nodemon');

// POST
const addProduct = async(product) => {
   const productCreated = await Product.create({...product}, {isNewRecord: true});
   return productCreated.get();
}

const allPorducts = async() => {
    try {
        const list = await Product.findAll();
        return list;
    } catch (err) {
        return {
            error: err
        };
    }
}

const selectProductByPK = async (id) => {
    try {
        const product = await Product.findOne({
            where:{
                Id: id,
            }
        }, {attributes: ['Name', 'Price']});
        return product.get();
    }catch(err){
        return {
            error: true
        };
    }
}
const updateProduct = async(id, body) => {
    try {
        const product = await Product.findOne({
            where: {
                Id: id
            }
        });
        await product.update(body);

        const uProduct = await product.save();
        
        return uProduct;
        
    } catch (err) {
        return{
            error: true
        };
    }
}
const deleteProd = async(id) => {

    const deleted = await Product.destroy({
        where: {
            Id: id
        }
    });

    return deleted
}

module.exports = {
    addProduct,
    selectProductByPK,
    updateProduct,
    allPorducts,
    deleteProd
}