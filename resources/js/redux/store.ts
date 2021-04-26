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

import {
    addBookAction,
    addBookReducer,
    resetAddBook,
    getBookAction,
    resetGetBook,
    getBookReducer,
    deleteBookReducer,
    deleteBookAction,
    getSingleBookAction,
    getSingleBookReducer,
    resetSingleGetBook,
    updateBookAction,
    updateBookReducer,
    getIssuedBookAction,
    getIssuedBookReducer,
    addIssuedBookReducer,
    addIssuedBookAction,
    deleteIssuedBookAction,
    deleteIssuedBookReducer,
} from "./books";

import {
    getCartBookAction,
    getCartBookReducer,
    resetCartBook,
    cartInitialState,
} from "./cart";
//Local Storage
const userInfo = localStorage.getItem("UserInfo");
const cart = localStorage.getItem("cart");

const preloadedState = {
    login: userInfo ? JSON.parse(userInfo) : LoginInitialState,
    cartBook: cart ? JSON.parse(cart) : cartInitialState,
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
        getBooks: getBookReducer,
        deleteBook: deleteBookReducer,
        getSingleBook: getSingleBookReducer,
        updateBook: updateBookReducer,
        cartBook: getCartBookReducer,
        getIssuedBook: getIssuedBookReducer,
        addIssuedBook: addIssuedBookReducer,
        deleteIssuedBook: deleteIssuedBookReducer,
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
export const getBookSelector = (s: RootState) => s.getBooks;
export const deleteBookSelector = (s: RootState) => s.deleteBook;
export const getSingleBookSelector = (s: RootState) => s.getSingleBook;
export const updateBookSelector = (s: RootState) => s.updateBook;
export const getCartBookSelector = (s: RootState) => s.cartBook;
export const getIssuedBookSelector = (s: RootState) => s.getIssuedBook;
export const addIssuedBookSelector = (s: RootState) => s.addIssuedBook;
export const deleteIssuedBookSelector = (s: RootState) => s.deleteIssuedBook;

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
    getBookAction,
    resetGetBook,
    deleteBookAction,
    getSingleBookAction,
    resetSingleGetBook,
    updateBookAction,
    getCartBookAction,
    resetCartBook,
    getIssuedBookAction,
    addIssuedBookAction,
    deleteIssuedBookAction,
};
