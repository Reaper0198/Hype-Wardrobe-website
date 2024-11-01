import { configureStore }  from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductSlice from './product-slice/product-slice'
import ShopProductSlice from './shop-slice/shop-slice'
import ShopCartSlice from './shop-slice/cart-slice'
import shopAddressSlice from './shop-slice/address-slice'




const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : AdminProductSlice,
        shopProducts : ShopProductSlice,
        shopCart : ShopCartSlice,
        shopAddress : shopAddressSlice
    }  
})

export default store;