import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminLayout from "../../components/Shared/AdminLayout";
const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    return (
        <AdminLayout title="DashBoard">
            <div className="h-full  bg-white flex flex-col"></div>
        </AdminLayout>
    );
};

export default Dashboard;
