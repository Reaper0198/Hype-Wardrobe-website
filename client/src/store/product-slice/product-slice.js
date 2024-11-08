import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : []
}

//add a new Product
export const addNewProduct = createAsyncThunk('/products/addnewproduct', async (formData)=>{
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    return result?.data;
})

//fetch all products
export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async ()=>{
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
    return result?.data;
})

// edit a product
export const editAProduct = createAsyncThunk('/products/editproduct', async ({id, formData})=>{
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    return result?.data;
})

//delete product
export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id)=>{
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
    return result?.data;
})

const AdminProductSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(fetchAllProducts.pending, (state)=>{
            state.isLoading = true
        }
        ).addCase(fetchAllProducts.fulfilled, (state, action)=>{
            //console.log('action.payload',action.payload)
           state.isLoading = false,
            state.productList = action.payload.data
        }
        ).addCase(fetchAllProducts.rejected, (state, action)=>{
            state.isLoading = false,
            state.productList = []
        })
    },
});

export default AdminProductSlice.reducer;