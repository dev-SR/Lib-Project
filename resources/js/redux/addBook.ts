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

export const addBookReducer = addBookSlice.reducer;
export const { resetAddBook } = addBookSlice.actions;

export { addBookAction };
