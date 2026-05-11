// [GET] /admin/products

const Product = require('../../models/product.model');
module.exports.adminProducts = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });
    console.log(products);

            res.render('admin/pages/products/index.pug', {
                titlePage: 'Danh sách san pham'
                ,
                products : products
            })
        
    }   