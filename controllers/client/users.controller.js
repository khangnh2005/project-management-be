const User = require("../../models/users.model")
module.exports.notFriend = async (req , res )=>{
    const userId = res.locals.user.id
    console.log(userId)
    const users = await User.find({
        _id : {$ne : userId},
        deleted : false,
        status : "active"
    }).select("-password")

    res.render("client/pages/users/not-friend",{
        titlePage : "Danh sách người dùng",
        users : users
    })
}
module.exports.friends = async (req , res )=>{
    res.render("client/pages/users/friend",{
        titlePage : "Danh sách bạn bè"
    })
}
module.exports.request = async (req , res )=>{
    res.render("client/pages/users/request",{
        titlePage : "Lời mời đã gửi"
    })
}
module.exports.accept = async (req , res )=>{
    res.render("client/pages/users/accept",{
        titlePage : "Lời mời kết bạn"
    })
}