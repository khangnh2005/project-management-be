const Role = require("../../models/role.model")
const Account = require("../../models/accounts.model")

const systemConfig = require("../../config/system")

module.exports.index = async (req,res)=>{

    res.render("admin/pages/my-account/index", {
        titlePage : "Trang thông tin cá nhân "
    })
}

module.exports.edit = async (req,res)=>{
    res.render("admin/pages/my-account/edit", {
        titlePage : "Chỉnh sửa thông tin cá nhân ",

    })
}

module.exports.editPatch = async (req,res)=>{
    try {
            const id = res.locals.user.id
            
                const emailExist = await Account.findOne({
                    _id : {$ne : id},   // $ne : lọc ra bản ghi không có id kia
                    email : req.body.email, 
                    deleted : false
                })
                if(emailExist){
                    req.flash("error" , "Email đã tồn tại , Vui lòng nhập email khác!")
                    res.redirect(req.headers.referer)
                    return;
                }
            
            if(req.body.password){
                req.body.password = md5(req.body.password)
            }
            else {
                delete req.body.password;
            }

            const account = await Account.updateOne({_id : id}, req.body);
            req.flash("success" , "Cập nhật thành công")
            res.redirect(`${systemConfig.prefixAdmin}/my-account`)
            
        } catch (error) {
            console.error("Lỗi cập nhật tài khoản:", error);
            req.flash("error" , "Cập nhật không thành công")
            res.redirect(req.headers.referer)
        }

}