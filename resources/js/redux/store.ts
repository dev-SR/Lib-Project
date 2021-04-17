import { configureStore } from "@reduxjs/toolkit";
import { todosReducer, fetchTodos } from "./dashboardReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: todosReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const selectStatus = (state: RootState) => state.status;
export const selectTodo = (state: RootState) => state.list;
export const selectError = (state: RootState) => state.error;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export { fetchTodos };
