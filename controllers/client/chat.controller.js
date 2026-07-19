const Chat = require("../../models/chat.model") 
const User = require("../../models/users.model") 
module.exports.index = async (req,res)=>{
    // SocketIO
    _io.once('connection', (socket) => {
        console.log('a user connected' , socket.id);
        socket.on("CLIENT_SEND_MESSAGE" , async (content) =>{
            console.log(res.locals.user.id)
            console.log(content)
            const chat = new Chat({user_id : res.locals.user.id ,content : content})
            await chat.save();
            
        })
    });
    //End SocketIOs
    // lấy data từ database 
    const chats = await Chat.find({deleted : false})
    
    for (const chat of chats) {
        const infoUser = await User.findOne({_id : chat.user_id}).select("fullName")
        chat.infoUser = infoUser
    }

    res.render("client/pages/chat/index", {
        titlePage :"Trò chuyện",
        chats : chats
    })
}