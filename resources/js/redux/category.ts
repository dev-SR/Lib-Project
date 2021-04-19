import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "./axios_config";

type ValidationError = {
    message: string;
    errors: {
        [k: string]: string[];
    };
};

type AddCat = {
    success: boolean;
    error: null | ValidationError;
    status: "idle" | "loading";
};

const initialState = {
    success: false,
    error: null,
    status: "idle",
} as AddCat;

type Category = {
    name: string;
};

const addCategoryAction = createAsyncThunk<
    AddCat,
    Category,
    { rejectValue: ValidationError }
>(
    "category/add",

    async (cat: Category, thunkApi) => {
        try {
            // console.log(cat);
            const { data } = await Api.post(`/add-category`, {
                name: cat.name,
            });
            return data;
        } catch (error) {
            const message =
                error.response && error.response.data
                    ? error.response.data
                    : error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const addCategorySlice = createSlice({
    name: "category/add",
    initialState,
    reducers: {
        reset(state) {
            state.status = "loading";
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCategoryAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
            state.success = false;
        });
        builder.addCase(addCategoryAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(addCategoryAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
            state.success = false;
        });
    },
});

export const addCategoryReducer = addCategorySlice.reducer;
const { reset } = addCategorySlice.actions;

export { addCategoryAction, reset };
