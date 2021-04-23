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
        [k: string]: string | null;
    } | null;
    token: string | null;
    is_admin: boolean;
    error: null | ValidationError;
    status: "idle" | "loading";
};

export const initialState: LoginStateType = {
    user: null,
    token: null,
    is_admin: false,
    error: null,
    status: "idle",
};

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
            thunkApi.dispatch(resetLogin());
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
        resetLogin(state) {
            state.status = "loading";
            state.error = null;
            state.is_admin = false;
            state.token = null;
            state.user = null;
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

interface UserRegisterPostType extends UserLoginPostType {
    password_confirmation: string;
    id: string;
    name: string;
}

//Register
const registerAction = createAsyncThunk<
    LoginStateType,
    UserRegisterPostType,
    { rejectValue: ValidationError }
>(
    "auth/register",

    async (u: UserRegisterPostType, thunkApi) => {
        try {
            // console.log(u);
            thunkApi.dispatch(resetLogin());
            thunkApi.dispatch(resetRegister());

            const { data } = await Api.post(`/register`, {
                password: u.password,
                email: u.email,
                password_confirmation: u.password_confirmation,
                id: u.id,
                name: u.name,
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

const registerSlice = createSlice({
    name: "auth/register",
    initialState,
    reducers: {
        resetRegister(s) {
            s.error = null;
            s.is_admin = false;
            s.token = null;
            s.status = "idle";
            s.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(registerAction.fulfilled, (s, { payload }) => {
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
        builder.addCase(registerAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
        });
    },
});

//logout
type logoutType = {
    message: null | string;
    error: null | ValidationError;
    status: "idle" | "loading";
};

const logoutInitial: logoutType = {
    message: null,
    error: null,
    status: "idle",
};
const logoutAction = createAsyncThunk<
    logoutType,
    void,
    { rejectValue: ValidationError }
>(
    "auth/logout",

    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await Api.post(`/logout`);
            if (data) {
                dispatch(resetLogin());
                dispatch(resetRegister());
            }
            return data as logoutType;
        } catch (error) {
            const message =
                error.response && error.response.data
                    ? error.response.data
                    : error.message;
            return rejectWithValue(message);
        }
    }
);
const logoutSlice = createSlice({
    name: "auth/logout",
    initialState: { ...logoutInitial },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logoutAction.pending, (state) => {
            state.status = "loading";
            state.error = null;
            state.message = null;
        });
        builder.addCase(logoutAction.fulfilled, (s, { payload }) => {
            s.message = payload.message;
            s.status = "idle";
            s.error = null;
            if (payload.message) {
                localStorage.removeItem("GreenLibToken");
                localStorage.removeItem("UserInfo");
            }
        });
        builder.addCase(loginAction.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
            state.status = "idle";
        });
    },
});

//reducers
export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer;
export const logoutReducer = logoutSlice.reducer;

//Actions
const { resetLogin } = loginSlice.actions;
const { resetRegister } = registerSlice.actions;

export { loginAction, registerAction, logoutAction };
