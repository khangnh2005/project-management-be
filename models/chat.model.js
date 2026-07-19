const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_id : String,
    room_chat_id : String,
    content : String ,
    images : Array,
    deletedAt :  Date 
},
{
    timestamps : true
}

);
const chat = mongoose.model('chat', chatSchema , 'chats');

module.exports = chat;
