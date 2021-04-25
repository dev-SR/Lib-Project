import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./axios_config";
type ValidationError = {
    errors: {
        fail_message: string;
    } | null;
};

type AddSubjectState = {
    success: boolean;
    success_message: string | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const addInitialState: AddSubjectState = {
    success_message: null,
    success: false,
    errors: null,
    status: "idle",
};

type SubjectInput = {
    subject: string;
    department: string;
};
//!Adding New Subject
const addSubjectAction = createAsyncThunk<
    AddSubjectState,
    SubjectInput,
    { rejectValue: ValidationError }
>(
    "Subject/add",

    async (s: SubjectInput, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetSubject());
            const { data } = await Api.post(`/subject`, {
                subject: s.subject,
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

const addSubjectSlice = createSlice({
    name: "Subject/add",
    initialState: { ...addInitialState },
    reducers: {
        resetAddSubject(state) {
            state.status = "idle";
            state.errors = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addSubjectAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addSubjectAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(addSubjectAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//Getting All Subject
export type Subject = {
    subject: string;
    id: number;
    department: {
        id: number;
        department: string;
    };
};
type GetSubjectState = {
    lists: Subject[] | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const getInitialState: GetSubjectState = {
    lists: [],
    errors: null,
    status: "idle",
};
//actions
const getSubjectAction = createAsyncThunk<
    GetSubjectState,
    void,
    { rejectValue: ValidationError }
>(
    "Subject/get",

    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(resetAddSubject());
            thunkApi.dispatch(resetDeleteSubject());
            thunkApi.dispatch(resetUpdateSubject());
            const { data } = await Api.get(`/subject`);
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
const getSubjectSlice = createSlice({
    name: "Subject/get",
    initialState: { ...getInitialState },
    reducers: {
        resetGetSubject(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSubjectAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getSubjectAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getSubjectAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!Get Single Subject
type GetOneSubjectState = {
    lists: Subject | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const getOneInitialState: GetOneSubjectState = {
    lists: null,
    errors: null,
    status: "idle",
};
//action

const getOneSubjectAction = createAsyncThunk<
    GetOneSubjectState,
    string,
    { rejectValue: ValidationError }
>(
    "Subject/getone",

    async (id: string, thunkApi) => {
        try {
            const { data } = await Api.get(`/subject/${id}`);
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

const getOneSubjectSlice = createSlice({
    name: "Subject/getone",
    initialState: { ...getOneInitialState },
    reducers: {
        resetGetOneSubject(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOneSubjectAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getOneSubjectAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getOneSubjectAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!DELETE Subject
interface DeleteSubjectState extends AddSubjectState {}

const deleteInitialState: DeleteSubjectState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
const deleteSubjectAction = createAsyncThunk<
    DeleteSubjectState,
    string,
    { rejectValue: ValidationError }
>(
    "Subject/delete",

    async (id: string, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetSubject());
            const { data } = await Api.delete(`/subject/${id}`);
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
const deleteSubjectSlice = createSlice({
    name: "Subject/delete",
    initialState: { ...deleteInitialState },
    reducers: {
        resetDeleteSubject(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteSubjectAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(deleteSubjectAction.fulfilled, (state, { payload }) => {
            state.success_message = payload.success_message;
            state.success = payload.success;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(deleteSubjectAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//!Update Subject
interface UpdateSubjectState extends AddSubjectState {}

const updateInitialState: UpdateSubjectState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
type UpdateSubject = {
    id: string;
    subject: string;
};
const updateSubjectAction = createAsyncThunk<
    UpdateSubjectState,
    UpdateSubject,
    { rejectValue: ValidationError }
>(
    "Subject/update",

    async (d: UpdateSubject, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetSubject());
            const { data } = await Api.put(`/subject/${d.id}`, {
                subject: d.subject,
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
//reducers
const updateSubjectSlice = createSlice({
    name: "Subject/update",
    initialState: { ...updateInitialState },
    reducers: {
        resetUpdateSubject(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateSubjectAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(updateSubjectAction.fulfilled, (state, { payload }) => {
            state.success_message = payload.success_message;
            state.success = payload.success;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(updateSubjectAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

export const addSubjectReducer = addSubjectSlice.reducer;
const { resetAddSubject } = addSubjectSlice.actions;

export const getSubjectReducer = getSubjectSlice.reducer;
const { resetGetSubject } = getSubjectSlice.actions;

export const getOneSubjectReducer = getOneSubjectSlice.reducer;
const { resetGetOneSubject } = getOneSubjectSlice.actions;

export const deleteSubjectReducer = deleteSubjectSlice.reducer;
const { resetDeleteSubject } = deleteSubjectSlice.actions;

export const updateSubjectReducer = updateSubjectSlice.reducer;
const { resetUpdateSubject } = updateSubjectSlice.actions;

export {
    addSubjectAction,
    getSubjectAction,
    deleteSubjectAction,
    getOneSubjectAction,
    updateSubjectAction,
};
