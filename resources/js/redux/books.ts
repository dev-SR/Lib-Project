import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./axios_config";

type ValidationError = {
    errors: {
        fail_message: string;
    } | null;
};

type AddBookState = {
    success: boolean;
    success_message: string | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const addInitialState: AddBookState = {
    success_message: null,
    success: false,
    errors: null,
    status: "idle",
};

export interface BookInput {
    book_id: number;
    title: string;
    isbn: string;
    publisher: string;
    authors: string;
    price: number;
    pages: number;
    copies: number;
    shelf_no: number;
    subject: string;
    department: string;
    img: string;
    edition: number;
}
//!Adding New Book
const addBookAction = createAsyncThunk<
    AddBookState, //Payload===response type
    BookInput, //function param
    { rejectValue: ValidationError }
>(
    "Book/add",

    async (s: BookInput, thunkApi) => {
        try {
            // thunkApi.dispatch(resetGetBook());
            const { data } = await Api.post(`/book`, s);
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

const addBookSlice = createSlice({
    name: "Book/add",
    initialState: { ...addInitialState },
    reducers: {
        resetAddBook(state) {
            state.status = "idle";
            state.errors = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addBookAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(addBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//!Getting Books
type Links = {
    url: string;
    label: string;
    active: boolean;
};
export interface FetchBooks {
    id: number;
    book_id: number;
    title: string;
    isbn: string;
    publisher: string;
    authors: string;
    price: number;
    pages: number;
    copies: number;
    shelf_no: number;
    subject: {
        id: number;
        subject: string;
    };
    department: {
        id: number;
        department: string;
    };
    img: string;
    edition: number;
}

interface Paginate {
    current_page: number;
    data: FetchBooks[];
    links: Links[];
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    from: number;
    per_page: number;
    to: number;
    total: number;
}
interface GetBooksState {
    lists: Paginate | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
}

const getInitialState: GetBooksState = {
    lists: null,
    errors: null,
    status: "idle",
};

const getBookAction = createAsyncThunk<
    Paginate, // Payload===response type
    number, // function param
    { rejectValue: ValidationError } //error Type
>(
    "Book/get",

    async (page: number, thunkApi) => {
        try {
            thunkApi.dispatch(resetDeleteBook());
            const { data } = await Api.get(`/book?page=${page}`);
            // console.log(data);
            return data as Paginate;
        } catch (error) {
            const message =
                error.response && error.response.data
                    ? error.response.data
                    : error.message;
            return thunkApi.rejectWithValue(message);
        }
    }
);

const getBookSlice = createSlice({
    name: "Book/get",
    initialState: { ...getInitialState },
    reducers: {
        resetGetBook(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getBookAction.fulfilled, (state, { payload }) => {
            state.lists = payload;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!DELETE Subject
interface DeleteBookState extends AddBookState {}

const deleteInitialState: DeleteBookState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
const deleteBookAction = createAsyncThunk<
    DeleteBookState,
    number,
    { rejectValue: ValidationError }
>(
    "Book/delete",

    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetBook());
            const { data } = await Api.delete(`/book/${id}`);
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
const deleteBookSlice = createSlice({
    name: "Book/delete",
    initialState: { ...deleteInitialState },
    reducers: {
        resetDeleteBook(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(deleteBookAction.fulfilled, (state, { payload }) => {
            state.success_message = payload.success_message;
            state.success = payload.success;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(deleteBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//! Get Single Book
interface GetBook {
    id: number;
    book_id: number;
    title: string;
    isbn: string;
    publisher: string;
    authors: string;
    price: number;
    pages: number;
    copies: number;
    shelf_no: number;
    subject: string;
    department: string;
    img: string;
    edition: number;
}

interface GetSingleBooksState {
    success: boolean;
    lists: GetBook | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
}

const getSingleInitialState: GetSingleBooksState = {
    success: false,
    lists: null,
    errors: null,
    status: "idle",
};

const getSingleBookAction = createAsyncThunk<
    GetSingleBooksState, //Payload===response type
    string, // function types
    { rejectValue: ValidationError }
>(
    "Book/getSingle",

    async (b: string, thunkApi) => {
        try {
            thunkApi.dispatch(resetUpdateBook());
            const { data } = await Api.get(`/book/${b}`);
            // console.log(data);
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

const getSingleBookSlice = createSlice({
    name: "Book/getSingle",
    initialState: { ...getSingleInitialState },
    reducers: {
        resetSingleGetBook(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSingleBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getSingleBookAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getSingleBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!Update Book
interface UpdateBookState extends AddBookState {}
const updateInitialState: UpdateBookState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
type UpdateBook = Omit<GetBook, "id">;
const updateBookAction = createAsyncThunk<
    UpdateBookState,
    UpdateBook,
    { rejectValue: ValidationError }
>(
    "Book/update",

    async (d: UpdateBook, thunkApi) => {
        try {
            thunkApi.dispatch(resetUpdateBook());

            const { data } = await Api.put(`/book/${d.book_id}`, d);
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
const updateBookSlice = createSlice({
    name: "Book/update",
    initialState: { ...updateInitialState },
    reducers: {
        resetUpdateBook(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(updateBookAction.fulfilled, (state, { payload }) => {
            state.success_message = payload.success_message;
            state.success = payload.success;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(updateBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//!GET ISSUED BOOKS
//Getting All Subject
export type IssuedBook = {
    id: number;
    user_id: number;
    book_id: number;
    user: {
        id: number;
        name: string;
    };
    book: {
        id: number;
        book_id: 1;
        title: string;
        img: string;
    };
};
type GetSubjectState = {
    lists: IssuedBook[] | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
};

const GetIssuedBookInitialState: GetSubjectState = {
    lists: [],
    errors: null,
    status: "idle",
};
//actions
const getIssuedBookAction = createAsyncThunk<
    GetSubjectState,
    void,
    { rejectValue: ValidationError }
>(
    "IssueBook/get",

    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(resetAddIssuedBook());
            thunkApi.dispatch(resetDeleteIssuedBook());
            const { data } = await Api.get(`/issue_book`);
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
const getIssuedBookSlice = createSlice({
    name: "IssueBook/get",
    initialState: { ...GetIssuedBookInitialState },
    reducers: {
        resetGetIssuedBook(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getIssuedBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getIssuedBookAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(getIssuedBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

//!ADD Issue BOOK

interface IssuedBookState extends AddBookState {}
const IssuedBookInitialState: IssuedBookState = {
    success_message: null,
    success: false,
    errors: null,
    status: "idle",
};

type IssuedBookInput = {
    user_id: number;
    book_id: number;
};
const addIssuedBookAction = createAsyncThunk<
    IssuedBookState,
    IssuedBookInput,
    { rejectValue: ValidationError }
>(
    "IssueBook/add",

    async (s: IssuedBookInput, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetIssuedBook());
            const { data } = await Api.post(`/issue_book`, s);
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

const addIssuedBookSlice = createSlice({
    name: "IssueBook/add",
    initialState: { ...IssuedBookInitialState },
    reducers: {
        resetAddIssuedBook(state) {
            state.status = "idle";
            state.errors = null;
            state.success = false;
            state.success_message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addIssuedBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(addIssuedBookAction.fulfilled, (state, { payload }) => {
            state.success = payload.success;
            state.success_message = payload.success_message;
            state.status = "idle";
            state.errors = null;
        });
        builder.addCase(addIssuedBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.success_message = null;
            state.success = false;
        });
    },
});

//! DELETE ISSUED BOOKS
interface DeleteISSUEDBookState extends AddBookState {}

const deleteIssuedBookInitialState: DeleteISSUEDBookState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
const deleteIssuedBookAction = createAsyncThunk<
    DeleteISSUEDBookState,
    number,
    { rejectValue: ValidationError }
>(
    "IssuedBook/delete",

    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetIssuedBook());
            const { data } = await Api.delete(`/issue_book/${id}`);
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
const deleteIssuedBookslice = createSlice({
    name: "IssuedBook/delete",
    initialState: { ...deleteIssuedBookInitialState },
    reducers: {
        resetDeleteIssuedBook(state) {
            state.status = "idle";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteIssuedBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.success_message = null;
            state.success = false;
        });
        builder.addCase(
            deleteIssuedBookAction.fulfilled,
            (state, { payload }) => {
                state.success_message = payload.success_message;
                state.success = payload.success;
                state.status = "idle";
                state.errors = null;
            }
        );
        builder.addCase(
            deleteIssuedBookAction.rejected,
            (state, { payload }) => {
                if (payload) state.errors = payload;
                state.status = "idle";
                state.success_message = null;
                state.success = false;
            }
        );
    },
});
export const addBookReducer = addBookSlice.reducer;
export const { resetAddBook } = addBookSlice.actions;
export const getBookReducer = getBookSlice.reducer;
export const { resetGetBook } = getBookSlice.actions;

export const deleteBookReducer = deleteBookSlice.reducer;
const { resetDeleteBook } = deleteBookSlice.actions;

export const updateBookReducer = updateBookSlice.reducer;
export const { resetUpdateBook } = updateBookSlice.actions;

export const getSingleBookReducer = getSingleBookSlice.reducer;
export const { resetSingleGetBook } = getSingleBookSlice.actions;

export const getIssuedBookReducer = getIssuedBookSlice.reducer;
export const { resetGetIssuedBook } = getIssuedBookSlice.actions;
export const addIssuedBookReducer = addIssuedBookSlice.reducer;
export const { resetAddIssuedBook } = addIssuedBookSlice.actions;

export const deleteIssuedBookReducer = deleteIssuedBookslice.reducer;
export const { resetDeleteIssuedBook } = deleteIssuedBookslice.actions;

export {
    addBookAction,
    getBookAction,
    deleteBookAction,
    getSingleBookAction,
    updateBookAction,
    getIssuedBookAction,
    addIssuedBookAction,
    deleteIssuedBookAction,
};
