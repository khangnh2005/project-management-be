var slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,  
    status: String,
    position: Number,
    product_category_id : {
        type : String,
        default : ""
    },
    slug: { type: String, slug: "title", unique : true },
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
const product = mongoose.model('role', roleSchema , 'roles');

module.exports = role;
