import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogCatService from './blogCatService';
const initialState = {
    blogCategories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getBlogCategories = createAsyncThunk(
    'blog-cat/get-blog-categories',
    async (thunkAPI) => {
        try {
            return blogCatService.getBlogCategories();
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const blogCatSlice = createSlice({
    name: 'blogCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
            })
            .addCase(getBlogCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default blogCatSlice.reducer;