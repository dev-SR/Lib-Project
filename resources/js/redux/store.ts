import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import {
    addCategoryReducer,
    addCategoryAction,
    getCategoryAction,
    getCategoryReducer,
} from "./subjectReducer";
import {
    loginAction,
    loginReducer,
    initialState as LoginInitialState,
    registerReducer,
    registerAction,
    logoutAction,
    logoutReducer,
    resetLogout,
} from "./authReducer";

import {
    addDepartmentAction,
    addDepartmentReducer,
    getDepartmentAction,
    getDepartmentReducer,
    deleteDepartmentAction,
    deleteDepartmentReducer,
    getOneDepartmentReducer,
    getOneDepartmentAction,
    updateDepartmentAction,
    updateDepartmentReducer,
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
        getDepartment: getDepartmentReducer,
        deleteDepartment: deleteDepartmentReducer,
        getOneDepartment: getOneDepartmentReducer,
        updateDepartment: updateDepartmentReducer,
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
export const logoutSelector = (s: RootState) => s.logout.message;

//department
export const addDepartmentSelector = (s: RootState) => s.addDepartment;
export const getDepartmentSelector = (s: RootState) => s.getDepartment;
export const deleteDepartmentSelector = (s: RootState) => s.deleteDepartment;
export const getOneDepartmentSelector = (s: RootState) => s.getOneDepartment;
export const upadteDepartmentSelector = (s: RootState) => s.updateDepartment;

//Actions
export {
    addCategoryAction,
    loginAction,
    getCategoryAction,
    registerAction,
    logoutAction,
    addDepartmentAction,
    getDepartmentAction,
    deleteDepartmentAction,
    getOneDepartmentAction,
    resetLogout,
    updateDepartmentAction,
};
