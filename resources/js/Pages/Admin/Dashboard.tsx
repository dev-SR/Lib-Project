import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/Shared/AdminLayout";
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

    return <AdminLayout title="DashBoard"></AdminLayout>;
};

export default Dashboard;
