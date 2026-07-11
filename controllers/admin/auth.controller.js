const Account = require("../../models/accounts.model")
const systemConfig = require("../../config/system")
const md5 = require('md5')

module.exports.login = async (req , res) => {
    res.render("admin/pages/auth/login",{
        titlePage : "Trang đăng nhập",
    })
}

module.exports.loginPost = async (req , res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Account.findOne({email: email , deleted : false})
        if (!user) {
            return res.render("admin/pages/auth/login", {
                titlePage: "Trang đăng nhập",
                error: "Email không tồn tại trong hệ thống!",
                errorField: "email",
                email: email
            });
        }


        
        if (md5(password) !== user.password) {
            return res.render("admin/pages/auth/login", {
                titlePage: "Trang đăng nhập",
                error: "Mật khẩu không chính xác!",
                errorField: "password",
                email: email
            });
        }

        if(user.status == "inactive"){
            return res.render("admin/pages/auth/login", {
                titlePage: "Trang đăng nhập",
                error: "Tài khoản bị khóa !",
                errorField: "email",
                email: email
            });
        }
        res.cookie("token" , user.token );
        req.flash("success", "Đăng nhập thành công");
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } catch (error) {
        console.error("Luồng đăng nhập thất bại:", error.message);

        return res.render("admin/pages/auth/login", {
            titlePage: "Trang đăng nhập",
            error: error.message || "Đã có lỗi xảy ra, vui lòng thử lại!",
            errorField: "email",
            email: req.body.email
        });
    }

}


module.exports.logout = async (req , res) => {
    res.clearCookie("token")
    res.render("admin/pages/auth/login",{
        titlePage : "Trang đăng nhập",
    })
}