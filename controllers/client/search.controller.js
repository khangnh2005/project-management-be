const Product = require("../../models/product.model")
const productsHelpers = require("../../helpers/products")
module.exports.index = async (req,res) =>{
    const keyword = req.query.keyword;
    let newProducts = [];

    if(keyword){
        const regex = new RegExp(keyword , "i")
        const productsSearch = await Product.find({
            title : regex,
            deleted : false,
            status : "active"
        })
        newProducts = productsHelpers.priceNewProducts(productsSearch)
    }   
    
    res.render("client/pages/search/index", {
        titlePage : "Kết quả tìm kiếm",
        keyword : keyword,
        products : newProducts
    })
}