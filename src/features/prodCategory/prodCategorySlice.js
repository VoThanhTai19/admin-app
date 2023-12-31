import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import prodCategoryService from './prodCategoryService';

const initialState = {
    prodCategories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getProdCategories = createAsyncThunk(
    'category/get-prod-categories',
    async (thunkAPI) => {
        try {
            return await prodCategoryService.getProdCategories();
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const getProdCategory = createAsyncThunk(
    'category/get-prod-category',
    async (id, thunkAPI) => {
        try {
            return await prodCategoryService.getProdCategory(id);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const createProdCategory = createAsyncThunk(
    'category/create-prod-category',
    async (data, thunkAPI) => {
        try {
            return prodCategoryService.createProdCategory(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const updateProdCategory = createAsyncThunk(
    'category/update-prod-category',
    async (data, thunkAPI) => {
        try {
            return prodCategoryService.updateProdCategory(data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const deleteProdCategory = createAsyncThunk(
    'category/delete-prod-category',
    async (id, thunkAPI) => {
        try {
            return prodCategoryService.deleteProdCategory(id);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    },
);

export const resetState = createAction('Reset_all');

export const prodCategorySlice = createSlice({
    name: 'prodCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProdCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProdCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodCategories = action.payload;
            })
            .addCase(getProdCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getProdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodCategoryName = action.payload.title;
            })
            .addCase(getProdCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProdCategory = action.payload;
            })
            .addCase(createProdCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProdCategory = action.payload;
            })
            .addCase(updateProdCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProdCategory = action.payload;
            })
            .addCase(deleteProdCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default prodCategorySlice.reducer;
