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
       
    }

    const product = new productCategory(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

  // [GET] /admin/products-category/edit/:id

module.exports.edit = async (req , res ) => {
    const id = req.params.id;

    let findRecords = {
        _id : id ,
        deleted : false
    }

    let findCategorys = {
        deleted : false
    }

    const records = await productCategory.findOne(findRecords);
    
    const categories = await productCategory.find(findCategorys);
    const newCategories = createTreeHelpers.tree(categories);  
    res.render("admin/pages/products-category/edit.pug" , {
        titlePage : "Chỉnh sửa danh mục",
        records : records,
        categories : newCategories
    })
}
  // [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req,res ) =>{
   
    const id = req.params.id;
    if(req.body.parent_id === id){
        req.body.parent_id = ""
    }
    try {
        const update = await productCategory.updateOne({_id : id},req.body)
        req.flash( "success","Cập nhật thành công" )
       
    } catch (error) {
        req.flash( "error","Cập nhật không thành thành công" )
        res.redirect(req.headers.referer)
    }
    
 res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
}