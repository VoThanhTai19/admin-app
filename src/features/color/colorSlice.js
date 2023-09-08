import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

const initialState = {
    colors: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getColors = createAsyncThunk('color/get-colors', async (thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getColor = createAsyncThunk('color/get-color', async (id, thunkAPI) => {
    try {
        return await colorService.getColor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createColor = createAsyncThunk('color/create-color', async (data, thunkAPI) => {
    try {
        return await colorService.createColor(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateColor = createAsyncThunk('color/update-color', async (data, thunkAPI) => {
    try {
        return await colorService.updateColor(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteColor = createAsyncThunk('color/delete-color', async (id, thunkAPI) => {
    try {
        return await colorService.deleteColor(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colorName = action.payload.title;
            })
            .addCase(getColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedColor = action.payload;
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedColor = action.payload;
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
