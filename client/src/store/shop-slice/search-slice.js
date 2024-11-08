import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading : false,
    searchResults : [] 
}


export const getSearchResults = createAsyncThunk('/order/getSearchResults',
    async(findThis)=>{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/search/`, findThis)

        return response?.data;
})


const searchSlice = createSlice({
    name : 'searchSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getSearchResults.pending, (state)=>{
            state.isLoading = true
        }
        ).addCase(getSearchResults.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.searchResults = action.payload.data
        }
        ).addCase(getSearchResults.rejected, (state)=>{
            state.isLoading = false,
            state.searchResults = []
        }
        )
}})

export default searchSlice.reducer;