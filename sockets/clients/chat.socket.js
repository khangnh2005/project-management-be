const Chat = require("../../models/chat.model") 
   
const uploadToCloudinary = require("../../helpers/uploadToCloudinary")
    
module.exports = (res)=>{
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
    //End SocketIO
}
    