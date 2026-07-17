const User = require("../../models/users.model");

module.exports.infoUser = async (req , res , next )=>{
    
    const user = await User.findOne({
        tokenUser : req.cookies.tokenUser,
        deleted : false,
        status : "active"
    }) 
    if(user){
        res.locals.user = user
    }

    next();
}