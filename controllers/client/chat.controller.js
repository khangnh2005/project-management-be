const Chat = require("../../models/chat.model") 
const User = require("../../models/users.model") 
module.exports.index = async (req,res)=>{
    // SocketIO
    _io.once('connection', (socket) => {
        const userId = res.locals.user.id
        const fullName = res.locals.user.fullName
        console.log('a user connected' , socket.id);
        socket.on("CLIENT_SEND_MESSAGE" , async (content) =>{
            
            
            const chat = new Chat({user_id : userId ,content : content})
            await chat.save();   
            
            _io.emit("SERVER_RETURN_MESSAGE",{
                userId : userId,
                fullName : fullName,
                content : content
            })
        })
        //Typing
        socket.on("CLIENT_SEND_TYPING" , async (type) =>{
            socket.broadcast.emit("SERVER_RETURN_TYPING" , {
                userId : userId,
                fullName : fullName,
                type : type
            }) 
        })
        //Typing

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