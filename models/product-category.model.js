
var slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,  
    status: String,
    position: Number,
    parent_id : String,
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
const productCategory = mongoose.model('productCategory', productCategorySchema , 'products-category');

module.exports = productCategory;