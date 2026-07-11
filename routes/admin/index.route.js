
const authMiddleware= require("../../middlewares/auth.middleware.js")

const dashboardRoute = require('./dashboard.route.js')
const systemConfig = require('../../config/system.js')
const ProductRoute = require('./products.route.js')
const ProductCategoryRoute = require('./products-category.route.js')
const RoleRoute = require('./roles.route.js')
const AccountRoute = require('./accounts.route.js')
const AuthRoute = require('./auth.route.js')

module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', 
        authMiddleware.requireAuth,
        dashboardRoute
    ) 
    app.use(PATH_ADMIN + '/products', 
        authMiddleware.requireAuth,
        ProductRoute
    ) 
    app.use(PATH_ADMIN + '/products-category',
        authMiddleware.requireAuth,
        ProductCategoryRoute) 
    app.use(PATH_ADMIN + '/roles',
        authMiddleware.requireAuth,
        RoleRoute) 
    app.use(PATH_ADMIN + '/accounts',
        authMiddleware.requireAuth,
        AccountRoute) 
    app.use(PATH_ADMIN + '/auth',AuthRoute) 

}

