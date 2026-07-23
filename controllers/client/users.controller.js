const User = require("../../models/users.model")

const userSocket = require("../../sockets/clients/user.socket")
module.exports.notFriend = async (req , res )=>{
    const userId = res.locals.user.id
    
    const users = await User.find({
        $and:[
            {_id : {$ne : userId}},
            {_id : {$nin : res.locals.user.requestFriends}},
            {_id : {$nin : res.locals.user.acceptFriends}},
        ], //ne : not equal ,yt nin : not in (trong mang)
        deleted : false,
        status : "active"
    }).select("-password")

    
    //userSocket
    userSocket(res)
    //userSocket end

    res.render("client/pages/users/not-friend",{
        titlePage : "Danh sách người dùng",
        users : users
    })
}
module.exports.friends = async (req , res )=>{
    

    res.render("client/pages/users/friend",{
        titlePage : "Danh sách bạn bè",
        
    })
}
module.exports.request = async (req , res )=>{
    const userId = res.locals.user.id
    const users = await User.find({
        _id : { $in : res.locals.user.requestFriends}, //ne : not equal ,yt nin : not in (trong mang)
        deleted : false,
        status : "active"
    }).select("-password") 

    //userSocket
    userSocket(res)
    //userSocket end

    res.render("client/pages/users/request",{
        titlePage : "Lời mời đã gửi",
        users : users

    })
}
module.exports.accept = async (req , res )=>{
    const userId = res.locals.user.id
    const users = await User.find({
        _id : { $in : res.locals.user.acceptFriends},
        deleted : false,
        status : "active"
    }).select("-password")
    
     //userSocket
    userSocket(res)
    //userSocket end
    
    res.render("client/pages/users/accept",{
        titlePage : "Lời mời kết bạn",
        users : users
    })
}
