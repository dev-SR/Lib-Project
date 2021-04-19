import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "./axios_config";

type ValidationError = {
    message: string;
    errors: {
        [k: string]: string[];
    };
};

type UserState = {
    logged: boolean;
    token: string;
    error: null | ValidationError;
    status: "idle" | "loading";
};

const initialState = {
    logged: false,
    token: "",
    error: null,
    status: "idle",
} as UserState;

type User = {
    name: string;
};

const loginAction = createAsyncThunk<
    UserState,
    User,
    { rejectValue: ValidationError }
>(
    "auth/login",

    async (u, thunkApi) => {
        try {
            // console.log(cat);
            const { data } = await Api.post(`/login`, {
                name: "abc",
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

const loginSlice = createSlice({
    name: "auth/login",
    initialState,
    reducers: {
        reset(state) {},
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(loginAction.fulfilled, (state, { payload }) => {
            state.logged = payload.logged;
            state.token = payload.token;
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(loginAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
        });
    },
});

export const loginReducer = loginSlice.reducer;
const { reset } = loginSlice.actions;

export { loginAction, reset };
