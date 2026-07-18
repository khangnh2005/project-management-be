const md5 = require('md5')
const User = require("../../models/users.model")
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/generateRDString")
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

    res.cookie("tokenUser" , existUser.tokenUser)
    req.flash("success" , "Đăng nhập thành công")
    res.redirect("/")

}

module.exports.logout = async (req , res )=>{
    res.clearCookie('tokenUser');
    res.redirect(`/user/login`)
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
    res.send("OKe")
}


