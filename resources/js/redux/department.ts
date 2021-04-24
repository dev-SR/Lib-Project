import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./axios_config";
import { Department } from "./../types/typeDef";
type ValidationError = {
    errors: {
        fail_message: string;
    } | null;
};

type AddDepartmentState = {
    success: boolean;
    success_message: string | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const addInitialState: AddDepartmentState = {
    success_message: null,
    success: false,
    errors: null,
    status: "idle",
};

type DepartmentInput = {
    department: string;
};
//!Adding New Department
const addDepartmentAction = createAsyncThunk<
    AddDepartmentState,
    DepartmentInput,
    { rejectValue: ValidationError }
>(
    "department/add",

    async (s: DepartmentInput, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetDepartment());
            const { data } = await Api.post(`/department`, {
                department: s.department,
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
    name: "department/add",
    initialState: { ...addInitialState },
    reducers: {
        resetAddDepartment(state) {
            state.status = "idle";
            state.errors = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addDepartmentAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addDepartmentAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(addDepartmentAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//Getting All Department

type GetDepartmentState = {
    lists: Department[] | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const getInitialState: GetDepartmentState = {
    lists: [],
    errors: null,
    status: "idle",
};
//actions
const getDepartmentAction = createAsyncThunk<
    GetDepartmentState,
    void,
    { rejectValue: ValidationError }
>(
    "department/get",

    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(resetAddDepartment());
            thunkApi.dispatch(resetDeleteDepartment());
            const { data } = await Api.get(`/department`);
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
//reducer
const getDepartmentSlice = createSlice({
    name: "department/get",
    initialState: { ...getInitialState },
    reducers: {
        resetGetDepartment(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartmentAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getDepartmentAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getDepartmentAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!Get Single Department
type GetOneDepartmentState = {
    lists: Department | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const getOneInitialState: GetOneDepartmentState = {
    lists: null,
    errors: null,
    status: "idle",
};
//action

const getOneDepartmentAction = createAsyncThunk<
    GetOneDepartmentState,
    string,
    { rejectValue: ValidationError }
>(
    "department/getone",

    async (id: string, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetOneDepartment());
            // thunkApi.dispatch(resetGetDepartment());

            const { data } = await Api.get(`/department/${id}`);
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

const getOneDepartmentSlice = createSlice({
    name: "department/getone",
    initialState: { ...getOneInitialState },
    reducers: {
        resetGetOneDepartment(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOneDepartmentAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(
            getOneDepartmentAction.fulfilled,
            (state, { payload }) => {
                state.lists = payload.lists;
                state.status = "idle";
                state.errors = null;
            }
        );
        builder.addCase(
            getOneDepartmentAction.rejected,
            (state, { payload }) => {
                if (payload) state.errors = payload;
                state.status = "idle";
                state.lists = null;
            }
        );
    },
});

//!DELETE DEPARTMENT
interface DeleteDepartmentState extends AddDepartmentState {}

const deleteInitialState: DeleteDepartmentState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
const deleteDepartmentAction = createAsyncThunk<
    DeleteDepartmentState,
    number,
    { rejectValue: ValidationError }
>(
    "department/delete",

    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetDepartment());
            const { data } = await Api.delete(`/department/${id}`);
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
//reducers
const deleteDepartmentSlice = createSlice({
    name: "department/delete",
    initialState: { ...deleteInitialState },
    reducers: {
        resetDeleteDepartment(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteDepartmentAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(
            deleteDepartmentAction.fulfilled,
            (state, { payload }) => {
                state.success_message = payload.success_message;
                state.success = payload.success;
                state.status = "idle";
                state.errors = null;
            }
        );
        builder.addCase(
            deleteDepartmentAction.rejected,
            (state, { payload }) => {
                if (payload) state.errors = payload;
                state.status = "idle";
                state.success_message = null;
                state.success = false;
            }
        );
    },
});

export const addDepartmentReducer = addDepartmentSlice.reducer;
const { resetAddDepartment } = addDepartmentSlice.actions;

export const getDepartmentReducer = getDepartmentSlice.reducer;
const { resetGetDepartment } = getDepartmentSlice.actions;

export const getOneDepartmentReducer = getOneDepartmentSlice.reducer;
const { resetGetOneDepartment } = getOneDepartmentSlice.actions;

export const deleteDepartmentReducer = deleteDepartmentSlice.reducer;
const { resetDeleteDepartment } = deleteDepartmentSlice.actions;

export {
    addDepartmentAction,
    getDepartmentAction,
    deleteDepartmentAction,
    getOneDepartmentAction,
};
