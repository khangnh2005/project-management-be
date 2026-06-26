
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');
const paginationHelpers = require('../../helpers/pagination');
const Product = require('../../models/product.model');
// [GET] /admin/products
const systemConfig = require("../../config/system")
module.exports.adminProducts = async (req, res) => {
    
    //Đoạn filter 
    const filterStatus = filterStatusHelpers(req.query);

    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status;
    }   
    //Đoạn tìm kiếm
    const search = searchHelpers(req.query); 
    if(search.regex){
        find.title = search.regex;
    }
    const keyword = search.keyword;
    // console.log(req.query.status);

    //Pagination
        const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelpers(
        {
        currentPage :  1,
        limitItems : 4
        },
            req.query,
        countProducts
    )


   
    //End Pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip((req.query.page - 1) * objectPagination.limitItems).sort({position : -1});
     

            res.render('admin/pages/products/index.pug', {
                titlePage: 'Danh sách san pham'
                ,
                products : products,
                filterStatus : filterStatus,
                keyword : keyword,
                pagination : objectPagination
            })
        
    }   
// [Patch] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({ _id : id},{status: status});
    req.flash('success', 'Cập nhật sản phẩm thành công!');
    res.redirect('../..');
    } catch (error) {
        res.redirect('../..');
    }
    
}
// [Patch] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {

        const status = req.body.type; 
        const ids = req.body.ids.split(" , ");
        
        
        switch (status) {
            case "active":
                await Product.updateMany({ _id : { $in: ids } },{ status : "active" });
                req.flash('success', `Cập nhật thành công ${ids.length} sản phẩm`);
                break;
            case "inactive":
                await Product.updateMany({ _id : { $in: ids } },{ status : "inactive" });
                req.flash('success', `Cập nhật thành công ${ids.length} sản phẩm`);               
                break;
            case "delete" :
                await Product.updateMany({_id : {$in : ids}},{
                    deleted: "true" ,
                    deletedAt : new Date() 
                })
                req.flash('success', `Xóa thành công ${ids.length} sản phẩm`);                
                break;
            case "position":
                    for (const item of ids) {
                        let [id , position] = item.split("-")
                        position = parseInt(position)
                       await Product.updateOne({_id : id},{position : position})
                       
                    }
                req.flash('success', `Đã đổi vị trí thành công ${ids.length} sản phẩm`);
                break;
            default:
                break;
        }
        
        res.redirect(req.headers.referer)
  
    
}
// [Delete] /admin/products/delete/:id
module.exports.deleteItem = async (req , res) =>{
    const id = req.params.id;
    
    // await Product.deleteOne({_id : id}); //Xóa cứng (xóa vĩnh viễn)
    await Product.updateOne({_id : id},{
        deleted : "true",
        deletedAt : new Date()
    })

    res.redirect(req.headers.referer);
}

//[GET] /admin/products/create
module.exports.create = async (req , res) =>{
    res.render('admin/pages/products/create', {
        titlePage: 'Them moi san pham'

    })
}

module.exports.createPost = async (req , res) =>{
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = Number(req.body.position)
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    

    console.log(req.body.params)
    
    if(req.body.position == ""){
       const count = await Product.countDocuments({});
        req.body.position = count + 1  
        
    } 
    else{
        console.log(req.body.position)
    }
    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[PATCH] /admin/products/edit/:id
module.exports.edit = async (req , res )=>{

    try {
        const find = {
            deleted : false,
            _id : req.params.id
        }
        const product = await Product.findOne(find)
        console.log(product)
        res.render("admin/pages/products/edit" ,{
            titlePage : "Chỉnh sửa sản phẩm",
            product : product
        } 
    )
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);       
    }

}

module.exports.editPatch = async ( req , res) =>{

      const id = req.params.id
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = Number(req.body.position);
        if(req.file){
            req.body.thumbnail = `/uploads/${req.file.filename}`
        }
    try {
        await Product.updateOne({_id : id }, req.body)
        req.flash("success" , "Cập nhật thành công")
    } catch (error) {
        req.flash("success" , "Cập nhật không thành công")
        res.redirect(req.headers.referer)
    }
    res.redirect(`${systemConfig.prefixAdmin}/products`);
   
}
//[PATCH] /admin/products/edit/:id