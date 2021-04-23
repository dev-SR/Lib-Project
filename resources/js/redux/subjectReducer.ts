import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "./axios_config";
/**
 * * Adding NEW SUBJECT NOT CATeGORY
 */
type ValidationError = {
    message: string;
    errors: {
        [k: string]: string[];
    };
};

type AddCat = {
    success: boolean;
    success_message: string | null;
    error: null | ValidationError;
    status: "idle" | "loading";
};

const initialState = {
    success_message: null,
    success: false,
    error: null,
    status: "idle",
} as AddCat;

type Category = {
    name: string;
};
//Adding New Category
const addCategoryAction = createAsyncThunk<
    AddCat,
    Category,
    { rejectValue: ValidationError }
>(
    "category/add",

    async (cat: Category, thunkApi) => {
        try {
            const { data } = await Api.post(`/subject`, {
                category_name: cat.name,
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

const addCategorySlice = createSlice({
    name: "category/add",
    initialState,
    reducers: {
        reset(state) {
            state.status = "loading";
            state.error = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCategoryAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addCategoryAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(addCategoryAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

type FetchError = {
    message: string;
};
type Cat = {
    id: number;
    category_name: string;
};
type GetCat = {
    lists: Cat[];
    error: null | FetchError;
} & Pick<AddCat, "status">;

const initialStateGetCat: GetCat = {
    error: null,
    status: "idle",
    lists: [],
};

//Adding New Category
const getCategoryAction = createAsyncThunk<
    GetCat,
    {},
    { rejectValue: FetchError }
>(
    "category/get",

    async (_, thunkApi) => {
        try {
            const { data } = await Api.get(`/category`);
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

const getCategorySlice = createSlice({
    name: "category/get",
    initialState: { ...initialStateGetCat },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategoryAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getCategoryAction.fulfilled, (state, { payload }) => {
            state.status = "idle";
            state.error = null;
            state.lists = payload.lists;
        });
        builder.addCase(getCategoryAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
        });
    },
});

export const addCategoryReducer = addCategorySlice.reducer;
const { reset } = addCategorySlice.actions;

export const getCategoryReducer = getCategorySlice.reducer;

export { addCategoryAction, getCategoryAction, reset };
