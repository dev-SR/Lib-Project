import React from "react";
import { useParams } from "react-router";
import AdminLayout from "../../../components/Shared/AdminLayout";

const UpdateDepartment = () => {
    const { id } = useParams<{ id: string }>();
    return <AdminLayout title="Update Student">{id}</AdminLayout>;
};

export default UpdateDepartment;
