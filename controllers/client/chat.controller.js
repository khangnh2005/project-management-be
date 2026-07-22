const Chat = require("../../models/chat.model") 
const User = require("../../models/users.model") 
const chatSocket = require("../../sockets/clients/chat.socket")


module.exports.index = async (req,res)=>{
    chatSocket(res)
    // lấy data từ database 
    const chats = await Chat.find({deleted : false})
    
    for (const chat of chats) {
        const infoUser = await User.findOne({_id : chat.user_id}).select("fullName")
        chat.infoUser = infoUser
        // Convert Buffer images → base64 để hiển thị trong view
        if(chat.images && chat.images.length > 0){
            chat.images = chat.images.map(img => {
                if(Buffer.isBuffer(img)) {
                    return `data:image/jpeg;base64,${img.toString('base64')}`
                }
                return img
            })
        }
    }

    res.render("client/pages/chat/index", {
        titlePage :"Trò chuyện",
        chats : chats
    })
}