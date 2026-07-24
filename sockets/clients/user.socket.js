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

            //Lay do dai acceptFriend cua B va tra ve cho B
            const infoUserB = await User.findOne({
                _id : userId
            })
            
            const lengthAcceptFriend = infoUserB.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_ACCEPT_FRIEND_LENGTH",{
                userId : userId,
                lengthAcceptFriend : lengthAcceptFriend
            }
            )

            //Lay ra thong tin cua A tra ve B 
            const infoUser = await User.findOne({
                _id : myUserId
            }).select("id avatar fullName")

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
                userId :userId,
                infoUser : infoUser
            })
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
            //Lay do dai acceptFriend cua B va tra ve cho B
            const infoUserB = await User.findOne({
                _id : userId
            })
            
            const lengthAcceptFriend = infoUserB.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_ACCEPT_FRIEND_LENGTH",{
                userId : userId,
                lengthAcceptFriend : lengthAcceptFriend
            }
            )

            socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
                userId : userId,
                myUserId : myUserId
            }
            )
           
        })

        socket.on("CLIENT_REJECT_FRIEND" , async (userId)=>{
            const myUserId = res.locals.user.id
            
            
            //Xoa id cua B khoi acceptFriend cua A
            
            const existIdAccept = await User.findOne({
                _id : myUserId,
                acceptFriends : userId 
            })

            if(existIdAccept){
                await User.updateOne(
                    {
                        _id : myUserId
                    },
                    {
                        $pull : {acceptFriends : userId}
                    }
                )
            }
            //Xoa id cua A khoi requestFriend cua B
            const existIdRequest = await User.findOne({
                _id : userId,
                requestFriends : myUserId 
            })

            if(existIdRequest){
                await User.updateOne(
                    {
                        _id : userId
                    },
                    {
                        $pull : {requestFriends : myUserId}
                    }
                )
            }
        })

        socket.on("CLIENT_ACCEPT_FRIEND" , async (userId)=>{
            const myUserId = res.locals.user.id
            console.log(userId)
            //Them {user_id , room_chat_id} cua B vao friendList cua A 
            //Xoa id cua B khoi acceptFriend cua A
            
            const existIdAccept = await User.findOne({
                _id : myUserId,
                acceptFriends : userId 
            })

            if(existIdAccept){
                await User.updateOne(
                    {
                        _id : myUserId
                    },
                    {
                        $push : {friendList :{
                                user_id: userId,
                                room_chat_id: ""
                            }
                        },
                        $pull : {acceptFriends : userId}
                    }
                )
            }


            //Them {user_id , room_chat_id} cua A vao friendList cua B
            //Xoa id cua A khoi requestFriend cua B
            const existIdRequest = await User.findOne({
                _id : userId,
                requestFriends : myUserId 
            })

            if(existIdRequest){
                await User.updateOne(
                    {
                        _id : userId
                    },
                    {
                        $push : {friendList :
                                    {
                                        user_id: myUserId,
                                        room_chat_id: ""
                                    }
                                },
                        $pull : {requestFriends : myUserId}
                    }
                )
            }
        })
   
    })
}