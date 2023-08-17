import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';

const initialState = {
    coupons: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getCoupons = createAsyncThunk('coupon/get-brands', async (thunkAPI) => {
    try {
        return couponService.getCoupons();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createCoupon = createAsyncThunk('coupon/create-coupon', async (data, thunkAPI) => {
    try {
        return couponService.createCoupon(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (id, thunkAPI) => {
    try {
        return couponService.deleteCoupon(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const brandSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;
