module.exports.createPost = async (req , res , next) =>{
    if(!req.body.title){
        req.flash("error" , "Vui lòng nhập tiêu đề")
        res.redirect(req.headers.referer)
        return;
    } else if (req.body.title.length < 1){
        req.flash("error" , "Vui lòng nhập ít nhất 1 ký tự!")
        res.redirect(req.headers.referer)
        return;
    }

   next();
}
