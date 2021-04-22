import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import {
    addCategoryReducer,
    addCategoryAction,
    getCategoryAction,
    getCategoryReducer,
} from "./categoryReducer";
import {
    loginAction,
    loginReducer,
    initialState as LoginInitialState,
    registerReducer,
    registerAction,
    logoutAction,
    logoutReducer,
} from "./authReducer";

import {
    resetDepartment,
    addDepartmentReducer,
    addDepartmentAction,
} from "./department";

//Local Storage
const userInfo = localStorage.getItem("UserInfo");
const preloadedState = {
    login: userInfo ? JSON.parse(userInfo) : LoginInitialState,
};
const store = configureStore({
    reducer: {
        addCategory: addCategoryReducer,
        login: loginReducer,
        getCategory: getCategoryReducer,
        register: registerReducer,
        logout: logoutReducer,
        addDepartment: addDepartmentReducer,
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

//auth
export const loginSelector = (s: RootState) => s.login;
export const registerSelector = (s: RootState) => s.register;

//department
export const addDepartmentSelector = (s: RootState) => s.addDepartment;

//Actions
export {
    addCategoryAction,
    loginAction,
    getCategoryAction,
    registerAction,
    logoutAction,
};
