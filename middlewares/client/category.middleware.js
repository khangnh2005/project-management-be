const productCategory = require("../../models/product-category.model")
const createTreeHelpers = require('../../helpers/createTree');
module.exports.category = async (req , res , next )=>{
        let find = {
        deleted : false
    }
    const ProductCategory = await productCategory.find(find)

    const newProductCategory = createTreeHelpers.tree(ProductCategory);  
    res.locals.layoutProductCategory = newProductCategory
    next();
}
