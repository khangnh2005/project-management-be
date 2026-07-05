
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions : {
      type : Array,
      default : [] 
    },
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
const product = mongoose.model('product', productSchema , 'products');

module.exports = product;