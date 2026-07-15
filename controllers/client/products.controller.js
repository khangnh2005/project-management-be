const productsHelpers = require("../../helpers/products")

// [GET] /products
const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const ProductCategoryHelpers = require('../../helpers/product-category');

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status : 'active',
        deleted : false
    }).sort({position : "desc"})
    productsHelpers.priceNewProducts(products)
    const newProducts = productsHelpers.priceNewProducts(products)
    res.render('client/pages/products/index.pug' ,{
        titlePage : 'Trang sản phẩm',
        products : newProducts
    })
}

module.exports.detail = async (req,res) =>{
    
        const slug = req.params.slugProduct;

        const find = {
            slug : slug,
            deleted : false,
            status : "active"
        }
        
        const product = await Product.findOne(find);
        const category = await ProductCategory.findOne({_id : product.product_category_id})
         productsHelpers.priceNewProduct(product)
        res.render("client/pages/products/detail" , {
            titlePage : "Chi tiết sản phẩm",
            product : product,
            category:category

        })

}

//[GET] /products/:slugCategory
module.exports.category = async (req,res )=>{

    try {
        const slugCategory = req.params.slugCategory
        const productsCategory = await ProductCategory.findOne({
            deleted : false,
            slug : slugCategory
        })
        const id = productsCategory.id


        const listSubCategory = await ProductCategoryHelpers.getSubCategory(productsCategory.id);
        const listSubCategoryId = listSubCategory.map(item => item.id); 

        const products = await Product.find({
            product_category_id : {$in: [productsCategory.id, ...listSubCategoryId]},
            deleted : false
        })
    
        const newProducts = productsHelpers.priceNewProducts(products)
            res.render("client/pages/products/productsCategory",{
                titlePage : "Sản phẩm",
                products : products
            })

   
    } catch (error) {
        console.log(error)
        res.redirect(req.headers.referer)
    }

}