const Product = require("../../models/product.model")
const Cart = require("../../models/cart.model")

const productsHelpers = require("../../helpers/products")
// [GET] /home
module.exports.index = async (req, res) => {

    //Lay ra san pham noi bat
    const productsFeatured = await Product.find({
        deleted : false,
        featured : "1",
        status : "active"
    }).limit(6)
    const newProductsFeatured = productsHelpers.priceNewProducts(productsFeatured)
    
    //Lay ra san pham moi nhat
    const productsNew = await Product.find({
        deleted : false,
        status : "active"
    }).sort({position : "desc"}).limit(6)
    const newProductsNew = productsHelpers.priceNewProducts(productsNew)
    
    res.render('client/pages/home/index.pug' , {
        titlePage : 'Trang Chủ',
        productsFeatured : newProductsFeatured,
        productsNew : newProductsNew,
    }) 

    
}