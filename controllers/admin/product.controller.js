// [GET] /admin/products
const filterStatusHelpers = require('../../helpers/filterStatus');
const Product = require('../../models/product.model');
module.exports.adminProducts = async (req, res) => {
    
    //Đoạn filter 
    const filterStatus = filterStatusHelpers(req.query);

    let find = {
        deleted: false
    }
    

    if(req.query.status){
        find.status = req.query.status
    }

    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword
        const regex = new RegExp(keyword, "i"); // Tìm gần đúng 
        find.title = regex;
    }
    // console.log(req.query.status);
    const products = await Product.find(find);
     

            res.render('admin/pages/products/index.pug', {
                titlePage: 'Danh sách san pham'
                ,
                products : products,
                filterStatus : filterStatus,
                keyword : keyword
            })
        
    }   

