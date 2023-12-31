import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';
const initialState = {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getBlog = createAsyncThunk('blog/get-blog', async (id, thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createBlog = createAsyncThunk('blog/create-blog', async (data, thunkAPI) => {
    try {
        return await blogService.createBlog(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateBlog = createAsyncThunk('blog/update-blog', async (data, thunkAPI) => {
    try {
        return await blogService.updateBlog(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteBlog = createAsyncThunk('blog/delete-blog', async (id, thunkAPI) => {
    try {
        return await blogService.deleteBlog(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogName = action.payload.title;
                state.blogDesc = action.payload.description;
                state.blogCategory = action.payload.category;
                state.blogImages = action.payload.images;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;
