import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./axios_config";

type ValidationError = {
    errors: {
        fail_message: string;
    } | null;
};
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

interface CartState {
    cart: GetBook[];
    success: boolean;
    lists: GetBook | null;
    errors: null | ValidationError;
    status: "idle" | "loading";
}

export const cartInitialState: CartState = {
    cart: [],
    success: false,
    lists: null,
    errors: null,
    status: "idle",
};

const getCartBookAction = createAsyncThunk<
    CartState, //Payload===response type
    string, // function types
    { rejectValue: ValidationError }
>(
    "Cart/getBook",

    async (b: string, thunkApi) => {
        try {
            const { data } = await Api.get(`/book/${b}`);
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
const getCartBookSlice = createSlice({
    name: "Cart/getBook",
    initialState: { ...cartInitialState },
    reducers: {
        resetCartBook(state) {
            state.status = "idle";
            state.errors = null;
            state.lists = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartBookAction.pending, (state) => {
            state.status = "loading";
            state.errors = null;
            state.lists = null;
        });
        builder.addCase(getCartBookAction.fulfilled, (state, { payload }) => {
            state.lists = payload.lists;
            state.status = "idle";
            state.errors = null;
            if (payload.lists) state.cart.push(payload.lists);
            localStorage.setItem("cart", JSON.stringify(state));
        });
        builder.addCase(getCartBookAction.rejected, (state, { payload }) => {
            if (payload) state.errors = payload;
            state.status = "idle";
            state.lists = null;
        });
    },
});

export const getCartBookReducer = getCartBookSlice.reducer;
export const { resetCartBook } = getCartBookSlice.actions;

export { getCartBookAction };
