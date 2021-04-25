import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

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
    resetGetOneDepartment,
    updateDepartmentReducer,
} from "./department";

import {
    addSubjectAction,
    getSubjectAction,
    deleteSubjectAction,
    getOneSubjectAction,
    updateSubjectAction,
    addSubjectReducer,
    getSubjectReducer,
    deleteSubjectReducer,
    getOneSubjectReducer,
    updateSubjectReducer,
} from "./subject";

import { addBookAction, addBookReducer, resetAddBook } from "./books";
//Local Storage
const userInfo = localStorage.getItem("UserInfo");
const preloadedState = {
    login: userInfo ? JSON.parse(userInfo) : LoginInitialState,
};
const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        logout: logoutReducer,
        addDepartment: addDepartmentReducer,
        getDepartment: getDepartmentReducer,
        deleteDepartment: deleteDepartmentReducer,
        getOneDepartment: getOneDepartmentReducer,
        updateDepartment: updateDepartmentReducer,
        addSubject: addSubjectReducer,
        getSubject: getSubjectReducer,
        deleteSubject: deleteSubjectReducer,
        getOneSubject: getOneSubjectReducer,
        updateSubject: updateSubjectReducer,
        addBook: addBookReducer,
    },
    preloadedState,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//useSelector Callbacks
//auth
export const loginSelector = (s: RootState) => s.login;
export const registerSelector = (s: RootState) => s.register;
export const logoutSelector = (s: RootState) => s.logout.message;

//department
export const addDepartmentSelector = (s: RootState) => s.addDepartment;
export const getDepartmentSelector = (s: RootState) => s.getDepartment;
export const deleteDepartmentSelector = (s: RootState) => s.deleteDepartment;
export const getOneDepartmentSelector = (s: RootState) => s.getOneDepartment;
export const updateDepartmentSelector = (s: RootState) => s.updateDepartment;

//department
export const addSubjectSelector = (s: RootState) => s.addSubject;
export const getSubjectSelector = (s: RootState) => s.getSubject;
export const deleteSubjectSelector = (s: RootState) => s.deleteSubject;
export const getOneSubjectSelector = (s: RootState) => s.getOneSubject;
export const updateSubjectSelector = (s: RootState) => s.updateSubject;

//BOOK
export const addBookSelector = (s: RootState) => s.addBook;

//Actions
export {
    loginAction,
    registerAction,
    logoutAction,
    addDepartmentAction,
    getDepartmentAction,
    deleteDepartmentAction,
    getOneDepartmentAction,
    resetLogout,
    updateDepartmentAction,
    resetGetOneDepartment,
    addSubjectAction,
    getSubjectAction,
    deleteSubjectAction,
    getOneSubjectAction,
    updateSubjectAction,
    addBookAction,
    resetAddBook,
};
