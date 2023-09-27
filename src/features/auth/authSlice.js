import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getOrderByUser = createAsyncThunk('order/get-order-user', async (id, thunkAPI) => {
    try {
        return await authService.getOrderByUser(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getOrder = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateOrder = createAsyncThunk('order/update', async (data, thunkAPI) => {
    try {
        return await authService.updateOrder(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getMonthlyOrders = createAsyncThunk('order/get-monthly', async (thunkAPI) => {
    try {
        return await authService.getMonthlyOrders();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getYearlyOrders = createAsyncThunk('order/get-yearly', async (thunkAPI) => {
    try {
        return await authService.getYearlyOrders();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderByUser = action.payload;
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderDetails = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderStatus = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getMonthlyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthly = action.payload;
            })
            .addCase(getMonthlyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getYearlyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearly = action.payload;
            })
            .addCase(getYearlyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;
