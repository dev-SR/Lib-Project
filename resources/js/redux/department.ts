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

type AddDepartmentStateType = {
    success: boolean;
    success_message: string | null;
    error: null | ValidationError;
    status: "idle" | "loading";
};

const AddDepartmentInitialState: AddDepartmentStateType = {
    success_message: null,
    success: false,
    error: null,
    status: "idle",
};

type DepartmentPostType = {
    department: string;
};

//Adding New Category
const addDepartmentAction = createAsyncThunk<
    AddDepartmentStateType,
    DepartmentPostType,
    { rejectValue: ValidationError }
>(
    "category/add",

    async (d: DepartmentPostType, thunkApi) => {
        try {
            const { data } = await Api.post(`/department`, {
                department: d.department,
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

const addDepartmentSlice = createSlice({
    name: "category/add",
    initialState: { ...AddDepartmentInitialState },
    reducers: {
        resetDepartment(state) {
            state.status = "loading";
            state.error = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addDepartmentAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addDepartmentAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(addDepartmentAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

export const addDepartmentReducer = addDepartmentSlice.reducer;
export const { resetDepartment } = addDepartmentSlice.actions;

export { addDepartmentAction };
