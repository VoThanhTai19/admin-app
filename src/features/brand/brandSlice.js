import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';

const initialState = {
    brands: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getBrands = createAsyncThunk('brand/get-brands', async (thunkAPI) => {
    try {
        return brandService.getBrands();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createBrand = createAsyncThunk('brand/create-brand', async (data, thunkAPI) => {
    try {
        return brandService.createBrand(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteBrand = createAsyncThunk('brand/delete-brand', async (id, thunkAPI) => {
    try {
        return brandService.deleteBrand(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBrand = action.payload;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;
