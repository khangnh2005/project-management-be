const productsRoute = require('./products.route') 
const homeRoute = require('./home.route')
const searchRoute = require('./search.route')
const cartRoute = require('./cart.route')
const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartIdMiddleware = require('../../middlewares/client/cart.middleware')
module.exports = (app) => { 
    app.use(categoryMiddleware.category)
    app.use(cartIdMiddleware.cartId)
    app.use('/', homeRoute) 
    app.use('/products', productsRoute) 
    app.use('/search', searchRoute) 
    app.use('/cart', cartRoute) 
}