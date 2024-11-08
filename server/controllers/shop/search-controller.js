const Product = require('../../models/Product')

const searchProducts = async(req, res) => {

    try{
        const {keyword} = req.body;

        if(!keyword){
            return res.status(400).json({
                success : false,
                message : "keyword is required"
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or : [
                {title : regEx},
                {description : regEx},
                {category : regEx},
                {brand : regEx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery)

        res.status(200).json({
            success : true,
            data : searchResults
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured"
        })
    }
}

module.exports = {searchProducts}