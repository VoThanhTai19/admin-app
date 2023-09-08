import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';

const initialState = {
    enquiries: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const getEnquiry = createAsyncThunk('enquiry/get-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.getEnquiry(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry', async (data, thunkAPI) => {
    try {
        return await enquiryService.updateEnquiry(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteEnquiry = createAsyncThunk('enquiry/delete-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.deleteEnquiry(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all');

export const enquirySlice = createSlice({
    name: 'enquiries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiryName = action.payload.name;
                state.enquiryMobile = action.payload.mobile;
                state.enquiryEmail = action.payload.email;
                state.enquiryComment = action.payload.comment;
                state.enquiryStatus = action.payload.status;
            })
            .addCase(getEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
            })
            .addCase(updateEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            })
            .addCase(deleteEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default enquirySlice.reducer;
