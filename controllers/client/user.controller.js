const md5 = require('md5')
const User = require("../../models/users.model")
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/generateRDString")
const sendMailHelper = require("../../helpers/sendMail")
const Cart = require("../../models/cart.model")
module.exports.login = async (req , res )=>{
    res.render("client/pages/user/login",{
        titlePage : "Đăng nhập"
    })
}

module.exports.register = async (req , res )=>{
    res.render("client/pages/user/register",{
        titlePage : "Đăng Ký"
    })
}

module.exports.registerPost = async (req , res )=>{
    
    req.body.password = md5(req.body.password)
    const existUser = await User.findOne({email: req.body.email})

    if(existUser){
        req.flash("error", `Email này đã được đăng ký`);
        res.redirect(req.headers.referer);
        return;
    }
    const user = new User(req.body)
    user.save();
    res.cookie("tokenUser" ,user.tokenUser)
    req.flash("success", `Đăng ký thành công`);
    res.redirect('/');
}

module.exports.loginPost = async (req , res )=>{
    
    req.body.password = md5(req.body.password)
    const existUser = await User.findOne({email: req.body.email , deleted: false})

    if(!existUser){
        req.flash("error" , "Email hoặc mật khẩu không đúng!")
        res.redirect(req.headers.referer);
    }

    if(req.body.password !== existUser.password){
        req.flash("error" , "Email hoặc mật khẩu không đúng!")
        res.redirect(req.headers.referer);
        return; 
    }

    if(existUser.status === "inactive"){
        req.flash("error" , "Tài khoản bị khóa!")
        res.redirect(req.headers.referer);
        return; 
    }
    const cart = Cart.findOne({user_id : existUser.id})
    if(cart){
        res.cookie("cartId",cart.id)
    }
    else {
        await Cart.updateOne({_id: req.cookies.cartId},
        {
            user_id : existUser.id
        }
    )
    }
    

    res.cookie("tokenUser" , existUser.tokenUser)
    req.flash("success" , "Đăng nhập thành công")
    res.redirect("/")

}

module.exports.logout = async (req , res )=>{
    res.clearCookie('cartId', { path: '/' });  
    res.clearCookie('tokenUser', { path: '/' });
   
    res.redirect(`/`)
}


module.exports.forgotPassword = async (req , res )=>{
    res.render("client/pages/user/forgot-password",{
        titlePage : "Lấy lại mật khẩu"
    })
}

module.exports.forgotPasswordPost = async (req , res )=>{
    const email = req.body.email

    const user = await User.findOne({email: email , deleted : false , status : "active"})

    if(!user){
        req.flash("error", "Email không tồn tại!")
        res.redirect(req.headers.referer)
        return;
    }
    
    //Lưu thông tin vào db
    const otp = generateHelper.generateRandomNumber(6);
    const objectForgotPassword = {
        email : email,
        otp: otp,
        expireAt : Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save();
    console.log(objectForgotPassword)
    //Nếu tồn tại thì ta sẽ gửi mã otp về email
    const subject = "Mã otp xác minh lấy lại mật khẩu" 
    const html = `
        Mã OTP để lấy lại mật khẩu : <b>${otp}</b> 
    `
    sendMailHelper.sendMail(email , subject , html);

    res.redirect(`/user/password/otp?email=${email}`)
}


module.exports.otpPassword = async (req , res )=>{
    const email = req.query.email;
    
    res.render("client/pages/user/otp-password",{
        titlePage : "Nhập mã otp",
        email : email
    })
}

module.exports.otpPasswordPost = async (req , res )=>{
    const email = req.body.email;
    const otp = req.body.otp
    
    const result = await ForgotPassword.findOne({
        email : email,
        otp : otp
    })

    if(!result){
        req.flash("error","otp không hợp lệ!")
        res.redirect(req.headers.referer)
    }
    const user = await User.findOne({email : email})

    res.cookie("tokenUser" , user.tokenUser)
    
    res.redirect('/user/password/reset')
    
}

module.exports.resetPassword = async (req , res )=>{

    res.render("client/pages/user/reset-password",{
        titlePage : "Đổi mật khẩu",
    })
}

module.exports.resetPasswordPost = async (req , res )=>{
    
    const password = md5(req.body.password);
    const tokenUser = req.cookies.tokenUser
    
  
    const user = await User.updateOne({
        tokenUser : tokenUser
    } , {
      password : password
    })

    req.flash("success" , "Đổi mật khẩu thành công")
    res.redirect("/")

}


module.exports.info = async (req , res )=>{
    const tokenUser = req.cookies.tokenUser 

    const user = await User.findOne({
        tokenUser : tokenUser
    }).select("-password")
    console.log(user)
    res.render("client/pages/user/info",{
        titlePage : "Profile",
        userInfo : user
    })
}

