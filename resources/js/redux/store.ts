import { configureStore } from "@reduxjs/toolkit";
import { addCategoryReducer, addCategoryAction } from "./category";
import { loginAction, loginReducer } from "./authReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: { addCategory: addCategoryReducer, login: loginReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//useSelector Callbacks
//cat
export const addCategorySuccessSelector = (s: RootState) =>
    s.addCategory.success;
export const addCategoryStatusSelector = (s: RootState) => s.addCategory.status;
export const addCategoryErrorSelector = (s: RootState) => s.addCategory.error;

//login
export const isLoggedSelector = (s: RootState) => s.login.logged;

//Actions
export { addCategoryAction, loginAction };
