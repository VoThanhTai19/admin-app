import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';
const initialState = {
    products: [],
    createdProduct: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return productService.getProducts();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createProduct = createAsyncThunk('product/create-product', async (data, thunkAPI) => {
    try {
        return productService.createProduct(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteProduct = createAsyncThunk('product/delete-product', async (id, thunkAPI) => {
    try {
        return productService.deleteProduct(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
