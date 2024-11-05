const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require ('./routes/auth-routes')
require('dotenv').config();
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/shop-products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')

mongoose.connect('mongodb+srv://kmtyagi198:kmtyagi198!@cluster0.bsx51.mongodb.net/'
).then(()=>console.log("MongoDB connected...")).catch(error=>console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))