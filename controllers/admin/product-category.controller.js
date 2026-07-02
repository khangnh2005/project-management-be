const productCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")
const paginationHelpers = require('../../helpers/pagination');
const createTreeHelpers = require('../../helpers/createTree');

// [GET] /admin/products-category

module.exports.index = async (req, res) => {
    let find = {
        deleted : false
    }


    //Pagination
    const countProductsCategory = await productCategory.countDocuments(find);
    let objectPagination = paginationHelpers(
        {
        currentPage :  1,
        limitItems : 4
        },
            req.query,
        countProductsCategory
    )
    //End Pagination 

    //Sort
    let sort= {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
        

    }else {
        sort.position = "desc"
    }

    
    
    const records = await productCategory.find(find)

    const newRecords = createTreeHelpers.tree(records);    

    res.render('admin/pages/products-category/index.pug', {
        titlePage: 'Danh Mục san pham',
        records : newRecords,
        pagination : objectPagination
    })
    
}
    
  // [GET] /admin/products-category/create  
module.exports.create = async (req , res ) =>{
    let find  = {
        deleted : false 
    } 

    


    const records = await productCategory.find(find)

    const newRecords = createTreeHelpers.tree(records);

    res.render("admin/pages/products-category/create", {
        titlePage : "Thêm Danh Mục",
        records : newRecords
    })
}
  // [Post] /admin/products-category/create  
module.exports.createPost = async (req , res) =>{
    req.body.position = Number(req.body.position)
    if(req.body.position == ""){
       const count = await productCategory.countDocuments({});
        req.body.position = count + 1  
        
    } 
    else{
        console.log(req.body.position)
    }

    const product = new productCategory(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

