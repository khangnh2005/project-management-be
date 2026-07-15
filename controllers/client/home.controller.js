const Product = require("../../models/product.model")

const productsHelpers = require("../../helpers/products")
// [GET] /home
module.exports.index = async (req, res) => {
    let find = {
        deleted : false,
        featured : "1",
        status : "active"
    }
    const products = await Product.find(find)
    const newProducts = productsHelpers.priceNewProducts(products)
    res.render('client/pages/home/index.pug' , {
        titlePage : 'Trang Chủ',
        products : newProducts
    }) 
}