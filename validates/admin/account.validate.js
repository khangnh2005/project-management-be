module.exports.createPost = async (req , res , next) =>{
    if(!req.body.fullName){
        req.flash("error" , "Vui lòng nhập Họ và tên")
        res.redirect(req.headers.referer)
        return;
    }
    if(!req.body.email){
        req.flash("error" , "Vui lòng nhập email")
        res.redirect(req.headers.referer)
        return;
    }
    if(!req.body.password){
        req.flash("error" , "Vui lòng nhập mật khảu")
        res.redirect(req.headers.referer)
        return;
    }

    if(!req.body.role_id){
        req.flash("error" , "Vui lòng chọn vai trò")
        res.redirect(req.headers.referer)
        return;
    }

   next();
}

module.exports.editPatch = async (req , res , next) =>{
    if(!req.body.fullName){
        req.flash("error" , "Vui lòng nhập Họ và tên")
        res.redirect(req.headers.referer)
        return;
    }
    if(!req.body.email){
        req.flash("error" , "Vui lòng nhập email")
        res.redirect(req.headers.referer)
        return;
    }

    if(!req.body.role_id){
        req.flash("error" , "Vui lòng chọn vai trò")
        res.redirect(req.headers.referer)
        return;
    }

   next();
}

