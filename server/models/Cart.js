const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                reqired : true,
                min : 1
            }
        },  
    ],

}, {
    timeStamps : true
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

module.exports = Cart;