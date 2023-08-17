import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
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

export const createBlogCategory = createAsyncThunk(
    'blog-cat/create-blog-category',
    async (data, thunkAPI) => {
        try {
            return blogCatService.createBlogCategory(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const deleteBlogCategory = createAsyncThunk(
    'blog-cat/delete-blog-category',
    async (id, thunkAPI) => {
        try {
            return blogCatService.deleteBlogCategory(id);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const resetState = createAction('Reset_all');

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
            })
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlogCategory = action.payload;
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlogCategory = action.payload;
            })
            .addCase(deleteBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogCatSlice.reducer;
