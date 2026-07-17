const md5 = require('md5')
const User = require("../../models/users.model")
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

module.exports.register = async (req , res )=>{
    res.clearCookie('tokenUser');
    res.redirect(`/user/login`)
}

