import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Shared/Layout";
// import {
//     useTypedSelector,
//     selectStatus,
//     selectTodo,
//     selectError,
//     fetchTodos,
// } from "../../redux/store";
const Dashboard = () => {
    const dispatch = useDispatch();
    // const status = useTypedSelector(selectStatus);
    // const todos = useTypedSelector(selectTodo);
    // const error = useTypedSelector(selectError);
    // const handleClick = () => dispatch(fetchTodos(10));

    useEffect(() => {
        // if (todos.length === 0) dispatch(fetchTodos(10));
    }, []);

    return <Layout title="DashBoard"></Layout>;
};

export default Dashboard;
