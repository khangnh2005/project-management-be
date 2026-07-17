const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/oder.model")
const productHelpers = require("../../helpers/products")
module.exports.index = async (req , res) =>{
     const cart = await Cart.findOne({_id : req.cookies.cartId}) 
    
        if(cart.products.length > 0 ){
            for (const item of cart.products) {
                const productId = item.product_id
                const productInfo = await Product.findOne({
                    _id : productId
                }).select("thumbnail title price slug productInfo discountPercentage")
                productInfo.priceNew = productHelpers.priceNewProduct(productInfo)
                item.productInfo = productInfo
                item.totalPrice = item.productInfo.price * item.quantity
                
            }
        }
        cart.totalPrice = cart.products.reduce((sum , item)=>sum + item.totalPrice , 0)
        
    res.render("client/pages/checkout/index", {
        titlePage: "Trang Thanh Toán",
        cartDetail : cart,
    })
}

module.exports.order = async (req , res) =>{    
    const cartId = req.cookies.cartId
    const userInfo = req.body
    const cart = await Cart.findOne({_id : cartId})
    const products = [];
    for (const product of cart.products) {
        const objectProduct = {
            product_id : product.product_id,
            price : 0,
            discountPercentage : 0,
            quantity : product.quantity 
        }

        const productInfo = await Product.findOne({_id : product.product_id}).select("price discountPercentage")

        objectProduct.price = productInfo.price
        objectProduct.discountPercentage = productInfo.discountPercentage

        products.push(objectProduct)
    }
    const orderInfo = {
        cart_id : cartId,
        userInfo : userInfo,
        products : products
    }

    const order = new Order(orderInfo)
    order.save();

    await Cart.updateOne({_id : cartId},{
        products : []
    })
    req.flash("success", "Điền thông tin thanh toán thành công")

    res.redirect(`/checkout/success/${order.id}`)
}

module.exports.success= async (req , res) =>{
    const order = await Order.findOne({_id : req.params.orderId})


    for (const product of order.products) {
        const productInfo = await Product.findOne({_id: product.product_id}).select("title thumbnail")
        product.productInfo = productInfo
        product.priceNew = productHelpers.priceNewProduct(product)
        product.totalPrice = product.quantity * product.priceNew
        
    }

    order.totalPrice = order.products.reduce((sum , item) => sum + item.totalPrice ,0)
    res.render("client/pages/checkout/success", {
        titlePage: "Đặt hàng thành công",
        order : order
    })
}