const Order = require('../../models/Order')
const Product = require('../../models/Product')
const ProductReview = require('../../models/Review')

const addProductReview = async(req, res) =>{
    try{

        const  {
            productId ,
            userId ,
            userName ,
            reviewMessage ,
            reviewValue ,
            } = req.body;

    const order = await Order.findOne({
        userId, 
        "cartItems.productId" : productId,
        orderStatus : 'confirmed'
    })

    if(!order){
        return res.status(403).json({
            success : false,
            message : "Product not bought yet"
        })
    }

    const checkExistingReview = await ProductReview.find({productId})

    if(checkExistingReview){
        return res.status(400).json({
            success : false,
            message : "Already reviewed this Product"
        })
    }

    const newReview = new ProductReview({
        productId ,
        userId ,
        userName ,
        reviewMessage ,
        reviewValue ,
        })

        await newReview.save();

        const reviews =  await ProductReview.find({productId})
        const totReviewLength = reviews.length;
        const avgReview = reviews.reduce((sum, reviewItem) => sum+ reviewItem.reviewValue, 0) / totReviewLength;

        await Product.findByIdAndUpdate(productId, {avgReview});

        res.status(201).json({
            success : true,
            data : newReview
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}

const getProductReview = async(req, res) =>{
    try{

        const {productId} = req.params;

        const review = await ProductReview.find({productId})
        res.status(20).json({
            success : true,
            data : review
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}

module.exports = {addProductReview, getProductReview};