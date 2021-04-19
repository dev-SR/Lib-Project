import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Api from "./axios_config";

type ValidationError = {
    message: string;
    errors: {
        [k: string]: string[];
    };
};

type LoginStateType = {
    user: {
        name: string;
        email: string;
    };
    token: string | null;
    is_admin: boolean;
    error: null | ValidationError;
    status: "idle" | "loading";
};

export const initialState = {
    user: {},
    token: null,
    is_admin: false,
    error: null,
    status: "idle",
} as LoginStateType;

type UserLoginPostType = {
    email: string;
    password: string;
};

const loginAction = createAsyncThunk<
    LoginStateType,
    UserLoginPostType,
    { rejectValue: ValidationError }
>(
    "auth/login",

    async (u: UserLoginPostType, thunkApi) => {
        try {
            // console.log(u);
            const { data } = await Api.post(`/login`, {
                password: u.password,
                email: u.email,
            });
            return data as LoginStateType;
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
        //to reset user;
        logout(state) {
            state.status = "loading";
            state.error = null;
            state.is_admin = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(loginAction.fulfilled, (s, { payload }) => {
            s.user = payload.user;
            s.token = payload.token;
            s.is_admin = payload.is_admin;
            s.status = "idle";
            s.error = null;
            if (payload.token) {
                localStorage.setItem("GreenLibToken", payload.token);
                localStorage.setItem("UserInfo", JSON.stringify(payload));
            }
        });
        builder.addCase(loginAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
        });
    },
});

export const loginReducer = loginSlice.reducer;
export const { logout } = loginSlice.actions;
export { loginAction };
