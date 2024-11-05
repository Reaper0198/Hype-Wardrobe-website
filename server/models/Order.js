const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId : String,
    cartId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            quantity : Number
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        city : String,
        phone : String,
        notes : String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : String,
    OrderDate : String,
    orderUpdateDate : String,
    paymentId : String,
    payerId : String
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = Order;