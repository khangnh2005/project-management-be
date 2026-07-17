
const mongoose = require('mongoose');
const generate = require('../helpers/generateRDString')

const userSchema = new mongoose.Schema({
    fullName: String,
    password:String,
    email: String ,
    tokenUser: {
        type:String,
        default : generate.generateRandomString(20)
    },
    phone:String,
    avatar: String ,
    status : {
        type:String,
        default : "active"
    } ,
    deleted: {
        type : Boolean,
        default : false
    },
    deletedAt : Date
},
{
    timestamps : true
}

);
const user = mongoose.model('user', userSchema , 'users');

module.exports = user;
