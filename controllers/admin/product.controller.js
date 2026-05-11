// [GET] /admin/products
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');
const Product = require('../../models/product.model');
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
    const products = await Product.find(find);
     

            res.render('admin/pages/products/index.pug', {
                titlePage: 'Danh sách san pham'
                ,
                products : products,
                filterStatus : filterStatus,
                keyword : keyword
            })
        
    }   

