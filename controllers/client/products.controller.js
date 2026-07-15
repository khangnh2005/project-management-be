const productsHelpers = require("../../helpers/products")

// [GET] /products
const Product = require('../../models/product.model');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : 'active',
        deleted : false
    }).sort({position : "desc"})
    
    const newProducts = productsHelpers.priceNewProducts(products)
    res.render('client/pages/products/index.pug' ,{
        titlePage : 'Trang sản phẩm',
        products : newProducts
    })
}

module.exports.detail = async (req,res) =>{
    
        const slug = req.params.slug;

        const find = {
            slug : slug,
            deleted : false
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail" , {
            titlePage : "Chi tiết sản phẩm",
            product : product
        })

}