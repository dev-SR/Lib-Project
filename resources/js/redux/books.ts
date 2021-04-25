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
    AddBookState,
    BookInput,
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
    Paginate,
    number,
    { rejectValue: ValidationError }
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

//!Update Book
interface UpdateBookState extends AddBookState {}

const updateInitialState: UpdateBookState = {
    success: false,
    success_message: null,
    errors: null,
    status: "idle",
};
//actions
type UpdateBook = {
    id: string;
    Book: string;
};
const updateBookAction = createAsyncThunk<
    UpdateBookState,
    UpdateBook,
    { rejectValue: ValidationError }
>(
    "Book/update",

    async (d: UpdateBook, thunkApi) => {
        try {
            thunkApi.dispatch(resetGetBook());
            const { data } = await Api.put(`/Book/${d.id}`, {
                Book: d.Book,
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

export const addBookReducer = addBookSlice.reducer;
export const { resetAddBook } = addBookSlice.actions;
export const getBookReducer = getBookSlice.reducer;
export const { resetGetBook } = getBookSlice.actions;

export const deleteBookReducer = deleteBookSlice.reducer;
const { resetDeleteBook } = deleteBookSlice.actions;

export const updateBookReducer = updateBookSlice.reducer;
const { resetUpdateBook } = updateBookSlice.actions;

export { addBookAction, getBookAction, deleteBookAction };
