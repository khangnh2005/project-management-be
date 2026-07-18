const SettingGeneral = require("../../models/setting-general.model")
module.exports.index = async (req,res)=>{
    const settingGeneral = await SettingGeneral.findOne({});
    res.render("admin/pages/settings/general" , {
        titlePage : "Cài đặt chung",
        settingGeneral : settingGeneral
    })
}
module.exports.generalPatch = async (req,res)=>{
    const existSettingGeneral = await SettingGeneral.findOne({});
    if(existSettingGeneral){
        await existSettingGeneral.updateOne(req.body)
        req.flash("success","Cập nhật thành công  ")
        res.redirect(req.headers.referer)
    }else{
        const settingGeneral = new SettingGeneral(req.body)
        await settingGeneral.save();
        res.redirect(req.headers.referer)
    }
    
}