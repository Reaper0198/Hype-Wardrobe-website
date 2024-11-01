const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async(req, res) =>{
    try{

        const {userId, productId, quantity} = req.body;

        if(!userId || !productId || quantity <= 0){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({userId});

        if(!cart){
            cart = new Cart({userId, items: []})
        }

        const findCurrProductInd = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrProductInd === -1){
            cart.items.push({productId, quantity})
        }else{
            cart.items[findCurrProductInd].quantity += quantity
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            data : cart,
            message : "product added to cart successfully"
        })

    }catch(e){
        console.log('error', e)
        res.status(500).json({
            success: false,
            message : "fail to add the product to the cart"
        })
    }
}

const fetchCartItems = async(req, res) =>{
    try{
        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "Invalid user"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salesPrice'
        })

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        const validItems = cart.items.filter(productItem=> productItem.productId);

        if(validItems.length < cart.length){
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            productId : item.productId._id,
            title : item.productId.title,
            image : item.productId.image,
            price : item.productId.price,
            salesPrice : item.productId.salesPrice,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    }catch(e){
        console.log('error', e)
        res.status(500).json({
            success: false,
            message : "fail to fetch the cart items"
        })
    }
}

const UpdateCartItemQty = async(req, res) =>{
    try{

        const {userId, productId, quantity} = req.body;

        if(!userId || !productId || quantity <= 0){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }
        
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        const findCurrProductInd = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrProductInd === -1){
            return res.status(404).json({
                success : false,
                message : 'item not found'
            })
        }
        cart.items[findCurrProductInd].quantity = quantity;
        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salesPrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId : item.productId? item.productId._id : null,
            title : item.productId? item.productId.title : "Product not found",
            image : item.productId? item.productId.image : null,
            price : item.productId? item.productId.price : null,
            salesPrice : item.productId? item.productId.salesPrice : null,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    }catch(e){
        console.log('error', e)
        res.status(500).json({
            success: false,
            message : "fail to update the product in the cart"
        })
    }
}

const deleteCartItem = async(req, res) =>{
    try{

        const {userId, productId} = req.params;

        if(!userId || !productId){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salesPrice'
        })
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salesPrice'
        })

        const populateCartItems = cart.items.map(item => ({
            productId : item.productId? item.productId._id : null,
            title : item.productId? item.productId.title : "Product not found",
            image : item.productId? item.productId.image : null,
            price : item.productId? item.productId.price : null,
            salesPrice : item.productId? item.productId.salesPrice : null,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    }catch(e){
        console.log('error', e)
        res.status(500).json({
            success: false,
            message : "fail to remove the product"
        })
    }
}

module.exports = { 
    addToCart,
    fetchCartItems,
    UpdateCartItemQty,
    deleteCartItem
}