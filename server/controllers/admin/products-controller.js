const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

const handleImageUpload = async (req, res) => {

    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result
        })

    } catch (error) {

        res.json({
            success: false,
            message: 'file not uploaded'
        });
    }
}

//add a new Product
const addProduct = async (req, res) => {
    try {

        const { image, title, description, category, brand, price, salesPrice, totalStock } = req.body;
        
        const newProduct = new Product({
            image, title, description, category, brand, price, salesPrice, totalStock
        })

        await newProduct.save();
        res.status(201).json({
            success : true,
            data : newProduct,
            message : "New product added successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "New Product not added"
        })
    }
}


// fetch all products
const fetchAllProduct = async (req, res) => {
    try {

        const listOfProducts = await Product.find({});
        res.status(200).json({
            success : true,
            data : listOfProducts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Products could not be fetched"
        })
    }
}

//edit a product
const editProduct = async (req, res) => {
    try {

        const {id} = req.params;
        const { image, title, description, category, brand, price, salesPrice, totalStock } = req.body;
        let findProduct = await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }else{
            findProduct.image = image || findProduct.image;
            findProduct.title = title || findProduct.title;
            findProduct.description = description || findProduct.description;    
            findProduct.category = category || findProduct.category;
            findProduct.brand = brand || findProduct.brand;
            findProduct.price = price=== ''? 0 : price || findProduct.price;
            findProduct.salesPrice = salesPrice=== ''? 0 : salesPrice || findProduct.salesPrice;
            findProduct.totalStock = totalStock || findProduct.totalStock;
    
            await Product.findByIdAndUpdate(id, findProduct);
    
            res.status(200).json({
                success : true,
                message : "Product updated successfully"
            })
        }        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product not edited"
        })
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    try {

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(product){
            res.status(200).json({
                success : true,
                message : "Product deleted successfully"
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Product not found,cannot delete"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product not deleted"
        })
    }
}

module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct };