import { configureStore }  from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductSlice from './product-slice/product-slice'
import ShopProductSlice from './shop-slice/shop-slice'



const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : AdminProductSlice,
        shopProducts : ShopProductSlice
    }  
})

export default store;