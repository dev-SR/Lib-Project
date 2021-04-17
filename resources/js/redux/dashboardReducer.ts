import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export type TodoId = string;

export type Todo = {
    id: TodoId;
    title: string;
    completed: boolean;
};

type TodosState = {
    status: "loading" | "idle";
    error: string | null;
    list: Todo[];
};

const initialState = {
    list: [],
    error: null,
    status: "idle",
} as TodosState;

type FetchTodosError = {
    message: string;
};

export const fetchTodos = createAsyncThunk<
    Todo[],
    {},
    { rejectValue: FetchTodosError }
>(
    "todos/fetch",

    async (_, thunkApi) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos`
        );
        if (response.status !== 200) {
            return thunkApi.rejectWithValue({
                message: "Failed to fetch todos.",
            });
        }
        const data: Todo[] = await response.json();
        return data;
    }
);

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
            state.list.push(...payload);
            state.status = "idle";
        });
        builder.addCase(fetchTodos.rejected, (state, { payload }) => {
            if (payload) state.error = payload.message;
            state.status = "idle";
        });
    },
});

export const todosReducer = todosSlice.reducer;
