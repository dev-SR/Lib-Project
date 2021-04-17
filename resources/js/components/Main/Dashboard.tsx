import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    useTypedSelector,
    selectStatus,
    selectTodo,
    selectError,
    fetchTodos,
} from "../../redux/store";
const App = () => {
    const dispatch = useDispatch();
    const status = useTypedSelector(selectStatus);
    const todos = useTypedSelector(selectTodo);
    const error = useTypedSelector(selectError);
    const handleClick = () => dispatch(fetchTodos(10));

    useEffect(() => {
        if (todos.length === 0) dispatch(fetchTodos(10));
    }, []);

    return (
        <div>
            <button type="button" onClick={handleClick}>
                {status === "loading" ? "Loading todos..." : "Load todos"}
            </button>
            {todos && todos.map((n) => <h1>{n.title}</h1>)}
            {error && <h1>{error}</h1>}
        </div>
    );
};

export default App;
