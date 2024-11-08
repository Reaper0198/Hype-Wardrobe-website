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
const shopSearchRouter = require('./routes/shop/search-routes')
const shopReviewRouter = require('./routes/shop/review-routes')

mongoose.connect(process.env.MONGO_URL
).then(()=>console.log("MongoDB connected...")).catch(error=>console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://hype-wardrobe-website-frontend.onrender.com', // Deployed frontend URL
    'http://localhost:5173' // Local development URL (if needed)
  ];

app.use(
    cors({
        origin : function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
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
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))