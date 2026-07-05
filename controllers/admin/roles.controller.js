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
