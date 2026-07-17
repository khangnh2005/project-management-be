const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelpers = require("../../helpers/products")
//[GET] /cart
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

    res.render("client/pages/cart/index",{
        titlePage: "Giỏ Hàng",
        cartDetail : cart,
        
    })
    
}

//[POST] /cart/add/:id
module.exports.addPost = async (req , res) =>{

    try {
        const productId = req.params.productId;
        const quantity = Number(req.body.quantity)
        const cartId = req.cookies.cartId
        const cart = await Cart.findOne({_id : cartId})
        
        // if(cart.products.)
        const existProductInCart =cart.products.find(item => item.product_id == productId)
        
        if (existProductInCart) {
            const quantityNew = quantity + existProductInCart.quantity
            
            await Cart.updateOne({_id : cartId , "products.product_id" : productId},
                {
                    $set : {
                        "products.$.quantity": quantityNew
                    }
                })
        } else {
            const objectCart = {
                product_id : productId,
                quantity : quantity
            }
            await Cart.updateOne({_id : cartId} , {
                $push : {products : objectCart}
            })
        }


        req.flash("success" , "Thêm vào giỏ hàng thành công")
        res.redirect(req.headers.referer)
    } catch (error) {
        console.log(error)
        req.flash("error" , "Thêm vào giỏ không hàng thành công")
        res.redirect(req.headers.referer)
    }
}
//[POST] /cart/delete/:id
module.exports.delete = async (req , res) =>{
    const cartId = req.cookies.cartId
    const productId = req.params.productId
    await Cart.updateOne({_id : cartId},
        {
            $pull : {products : {product_id:productId}}
        }
    )
    
    req.flash("success","Xoa san pham thanh cong")
    res.redirect(req.headers.referer)
}