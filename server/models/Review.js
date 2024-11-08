const mongoose = require('mongoose')


const ProductReviewSchema = new mongoose.Schema({
    productId : String,
    userId : String,
    userName : String,
    reviewMessage : String,
    reviewValue :Number,
    }
    ,{timestamps : true})

const ProductReview = mongoose.models.ProductReview || mongoose.model('ProductReview', ProductReviewSchema);

module.exports = ProductReview; 
