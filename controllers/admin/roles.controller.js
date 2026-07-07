//Add model
const Roles = require("../../models/role.model")

//Add systemConfig
const systemConfig = require("../../config/system")

// [GET] /admin/roles

module.exports.role = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Roles.find(find);

    res.render("admin/pages/roles/index" ,{
        titlePage: "Nhóm Quyền",
        records: records
    })
}
// [GET] /admin/roles/create

module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create" ,{
        titlePage: "Thêm Nhóm Quyền"
    })
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

    
    const roles = new Roles(req.body);
    
    await roles.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [Delete] /admin/products/delete/:id
module.exports.deleteItem = async (req , res) =>{
    const id = req.params.id;
    
    // await Product.deleteOne({_id : id}); //Xóa cứng (xóa vĩnh viễn)
    await Roles.updateOne({_id : id},{
        deleted : true,
        deletedAt : new Date()
    })

    res.redirect(req.headers.referer);
}

// [GET] /admin/roles/edit/:id

module.exports.edit = async (req, res) => {
    const id = req.params.id 
    let find = {
        _id : id 
    }
    const record =await Roles.findOne(find);
    res.render("admin/pages/roles/edit" ,{
        titlePage: "Sửa Nhóm Quyền",
        record : record
    })
}

// [GET] /admin/roles/edit/:id

module.exports.editPatch = async (req, res) => {
    

    
    try {
        const id = req.params.id ;
        const record =await Roles.updateOne({_id :id} , req.body);
        req.flash("success" , "Cập nhật thành công")

    } catch (error) {
        req.flash("success" , "Cập nhật không  thành công")
        res.redirect(req.headers.referer)
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted : false
    }
    const records = await Roles.find(find)
    res.render("admin/pages/roles/permissions" ,{
        titlePage: "Sửa Nhóm Quyền",
        records : records
    })
    
}
// [Patch] /admin/roles/permissions

module.exports.permissionsPatch = async (req, res) => {
     
   
    try {
        const permissions = JSON.parse(req.body.permissions);
        //for of 
        for (const item of permissions) {
            const id = item.id ;
            const permissions = item.permissions;

            await Roles.updateMany({_id : id} , {permissions : permissions} )
        }
        
        req.flash("success" , "cập nhật thành công");
    } catch (error) {
        req.flash("error" , "cập nhật không thành công");
        res.redirect(req.headers.referer)
    }
     res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)
}

