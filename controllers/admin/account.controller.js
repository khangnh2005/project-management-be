const { prefixAdmin } = require("../../config/system");
const Account = require("../../models/accounts.model")
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")

const md5 = require('md5')


module.exports.accounts = async (req , res)  =>{

    let find = {
        deleted : false
    }
    const records = await Account.find(find);
    const roles = await Role.find(find);
    res.render("admin/pages/accounts/index" , {
        titlePage:  "Danh sách tài khoản" ,
        records : records,
        roles : roles
    }
    )
}

module.exports.create = async (req , res)  =>{
    let find = {
        deleted : false
    }

    const records = await Account.find(find);
    const roles = await Role.find(find);
    
    res.render("admin/pages/accounts/create" , {
        titlePage:  "Tạo tài khoản" ,
        records : records,
        roles : roles
    }
    )
}

module.exports.createPost = async (req , res)  =>{
    req.body.password = md5(req.body.password)
    const emailExist = await Account.findOne({email : req.body.email, deleted : false})
    if(emailExist){
        req.flash("error" , "Email đã tồn tại , Vui lòng nhập email khác!")
        res.redirect(req.headers.referer)
    }
    else{
         const account = new Account(req.body);
        await account.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

   
   
}