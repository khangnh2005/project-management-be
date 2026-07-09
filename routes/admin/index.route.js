const dashboardRoute = require('./dashboard.route.js')
const systemConfig = require('../../config/system.js')
const ProductRoute = require('./products.route.js')
const ProductCategoryRoute = require('./products-category.route.js')
const RoleRoute = require('./roles.route.js')
const AccountRoute = require('./accounts.route.js')
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRoute) 
    app.use(PATH_ADMIN + '/products', ProductRoute) 
    app.use(PATH_ADMIN + '/products-category',ProductCategoryRoute) 
    app.use(PATH_ADMIN + '/roles',RoleRoute) 
    app.use(PATH_ADMIN + '/accounts',AccountRoute) 
}

