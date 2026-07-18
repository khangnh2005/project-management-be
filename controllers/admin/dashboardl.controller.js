const productCategory = require("../../models/product-category.model")
const product = require("../../models/product.model")
const account = require("../../models/accounts.model")
const user = require("../../models/users.model")

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    }

    // Category Product
    statistic.categoryProduct.total = await productCategory.countDocuments({
        deleted : false
    })

    statistic.categoryProduct.active = await productCategory.countDocuments({
        deleted : false,
        status : "active"
    })

    statistic.categoryProduct.inactive = await productCategory.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Product
    statistic.product.total = await product.countDocuments({
        deleted : false
    })

    statistic.product.active = await product.countDocuments({
        deleted : false,
        status : "active"
    })

    statistic.product.inactive = await product.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Account
    statistic.account.total = await account.countDocuments({
        deleted : false
    })

    statistic.account.active = await account.countDocuments({
        deleted : false,
        status : "active"
    })

    statistic.account.inactive = await account.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // User
    statistic.user.total = await user.countDocuments({
        deleted : false
    })

    statistic.user.active = await user.countDocuments({
        deleted : false,
        status : "active"
    })

    statistic.user.inactive = await user.countDocuments({
        deleted : false,
        status : "inactive"
    })
        
    res.render('admin/pages/dashboard/index.pug' , {
        titlePage : 'Trang Tổng Quan',
        statistic : statistic
    }) 
}
