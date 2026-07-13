
var slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,  
    status: String,
    position: Number,
    createdBy : {
        account_id : String ,
        createdAt:{
            type: Date,
            default : Date.now
        }
    },
    product_category_id : {
        type : String,
        default : ""
    },
    slug: { type: String, slug: "title", unique : true },
    deleted: {
        type : Boolean,
        default : false
    },
    deletedBy : {
        account_id : String ,
        deletedAt : Date
    },
    updatedBy : [
        {
            account_id : String ,
            updatedAt : Date
        }

    ],

},


);
const product = mongoose.model('product', productSchema , 'products');

module.exports = product;