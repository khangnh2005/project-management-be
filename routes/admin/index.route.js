const dashboardRoute = require('./dashboard.route.js')
const systemConfig = require('../../config/system.js')
const ProductRoute = require('./products.route.js')
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRoute) 
    app.use(PATH_ADMIN + '/products', ProductRoute) 
}

