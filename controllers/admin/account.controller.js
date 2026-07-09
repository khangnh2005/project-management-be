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

module.exports.edit = async (req , res)  =>{
   const id = req.params.id
   
   let find = {
        _id : id,
        deleted : false
   }     
   const account = await Account.findOne(find);
   const roles = await Role.find({deleted : false});
   res.render("admin/pages/accounts/edit" , {
    titlePage : "Chỉnh sửa tài khoản",
    account : account,
    roles : roles
   })
}

module.exports.editPatch = async (req , res)  =>{

    try {
        
        const id = req.params.id
            const emailExist = await Account.findOne({
                _id : {$ne : id},
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
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
        
    } catch (error) {
        req.flash("error" , "Cập nhật không thành công")
        res.redirect(req.headers.referer)
    }

}