
const mongoose = require('mongoose');
const generate = require('../helpers/generateRDString')

const accountSchema = new mongoose.Schema({
    fullName: String,
    password:String,
    email: String ,
    token: {
        type:String,
        default : generate.generateRandomString(20)
    },
    phone:String,
    avatar: String ,
    role_id:String ,
    status : String ,
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
const account = mongoose.model('account', accountSchema , 'accounts');

module.exports = account;
