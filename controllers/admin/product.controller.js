// [GET] /admin/products
module.exports.adminProducts = (req, res) => {
            res.render('admin/pages/products/index.pug', {
                titlePage: 'Danh sách san pham'
            })
        
    }   