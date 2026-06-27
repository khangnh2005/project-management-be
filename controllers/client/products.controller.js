// [GET] /products
const Product = require('../../models/product.model');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : 'active',
        deleted : false
    }).sort({position : "desc"})
    
    const newProducts = products.map(item => {
        item.newPrice = item.price - (item.price * item.discountPercentage / 100).toFixed(0);
        return item;
    });
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