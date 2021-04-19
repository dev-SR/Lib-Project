import { configureStore } from "@reduxjs/toolkit";
import {
    addCategoryReducer,
    addCategoryAction,
    getCategoryAction,
    getCategoryReducer,
} from "./categoryReducer";
import {
    loginAction,
    loginReducer,
    logout,
    initialState as LoginInitialState,
} from "./authReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const userInfo = localStorage.getItem("UserInfo");

const preloadedState = {
    login: userInfo ? JSON.parse(userInfo) : LoginInitialState,
};
const store = configureStore({
    reducer: {
        addCategory: addCategoryReducer,
        login: loginReducer,
        getCategory: getCategoryReducer,
    },
    preloadedState,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//useSelector Callbacks
//cat
export const addCategorySelector = (s: RootState) => s.addCategory;
export const getCategorySelector = (s: RootState) => s.getCategory;

//login
export const loginSelector = (s: RootState) => s.login;

//Actions
export { addCategoryAction, loginAction, getCategoryAction, logout };
