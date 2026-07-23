const User = require("../../models/users.model") 
   
const uploadToCloudinary = require("../../helpers/uploadToCloudinary")
     
module.exports = (res)=>{
        // SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND" , async (userId) =>{
            const myUserId =res.locals.user.id // ID cua nguoi gui ket ban (A)
            //userId : ID cua nguoi nhan (B)

            //Them id cua A vao acceptFriend cua B
            const existIdAccept = await User.findOne({
                _id: userId,
                acceptFriends: myUserId
            })
            if(!existIdAccept){
                await User.updateOne({_id : userId},
                    {
                        $push : {acceptFriends : myUserId}
                    }
                )
            }

            //Them id cua B vao requestFriend cua A
            const existIdRequest = await User.findOne({
                _id: myUserId,
                requestFriends: userId
            })
            if(!existIdRequest){
                await User.updateOne({_id : myUserId},
                    {
                        $push : {requestFriends : userId}
                    }
                )
            }
            
        });

        socket.on("CLIENT_CANCEL_FRIEND" , async (userId)=>{
            const myUserId =res.locals.user.id // ID cua A
            //userID : ID cua B

            //Xoa id cua A khoi acceptFriend cua B
            const existIdAccept = await User.findOne({_id : userId , acceptFriends : myUserId})
            if(existIdAccept){
                await User.updateOne({
                    _id : userId
                },
                {
                    $pull : {acceptFriends : myUserId}
                }
                )
            }
            //Xoa id cua B khoi requestFriends cua A
            const existIdRequest = await User.findOne({_id : myUserId , requestFriends : userId})
            if(existIdRequest){
                await User.updateOne({
                    _id : myUserId
                },
                {
                    $pull : {requestFriends : userId}
                }
                )
            }
           
        })
   
    })
}