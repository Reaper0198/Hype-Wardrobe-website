const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description : String,
    category : String,
    brand : String,
    price : Number,
    salesPrice : Number,
    totalStock : Number,
},{timestamps : true});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = Product;