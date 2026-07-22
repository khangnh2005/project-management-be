const Chat = require("../../models/chat.model") 
const User = require("../../models/users.model") 

const uploadToCloudinary = require("../../helpers/uploadToCloudinary")


module.exports.index = async (req,res)=>{
    // SocketIO
    _io.once('connection', (socket) => {
        const userId = res.locals.user.id
        const fullName = res.locals.user.fullName
        console.log('a user connected' , socket.id);

        socket.on("CLIENT_SEND_MESSAGE" , async (data) =>{
            const content = data.content 
            
            // Convert mảng byte thành Buffer
            const imagesBuffer = [];
            if(data.images && data.images.length > 0){
                for (const imageData of data.images) {
                    const buffer = Buffer.from(imageData); // array of bytes → Buffer
                    imagesBuffer.push(buffer);
                }
            }
            

            let images = [];
            for (const img of imagesBuffer) {
                const link = await uploadToCloudinary(img);
                images.push(link)
            }
            

            // Lưu vào database
            const chat = new Chat({
                user_id : userId ,
                content : content,
                images : images
            })
            await chat.save();   
            
            // Broadcast lại cho tất cả client (kể cả người gửi)
            _io.emit("SERVER_RETURN_MESSAGE",{
                userId : userId,
                fullName : fullName,
                content : content,
                images : images
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