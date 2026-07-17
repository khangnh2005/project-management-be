const mongoose = require('mongoose')

const oderSchema = new mongoose.Schema({
    // user_id : String,
    cart_id : String,
    userInfo : {
        fullName : String,
        phone : String,
        address : String
    },
    products : [
        {
            product_id : String,
            price : Number,
            quantity : Number , 
            discountPertage : Number
        }
    ],
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
const oder = mongoose.model('oder', oderSchema , 'oders');

module.exports = oder;