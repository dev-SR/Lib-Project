import React, { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { MyTextInput } from "../../../components/Formik";
import * as Yup from "yup";
import SnackBar, { useSnackBar } from "../../../components/reuseable/SnackBar";

import { useHistory, useParams } from "react-router";
import AdminLayout from "../../../components/Shared/AdminLayout";
import Api from "./../../../redux/axios_config";
import { useDispatch } from "react-redux";
import {
    getOneDepartmentAction,
    getOneDepartmentSelector,
    updateDepartmentSelector,
    updateDepartmentAction,
    useTypedSelector,
} from "../../../redux/store";

type Values = {
    department: string;
};

const initialValues: Values = {
    department: "",
};
export const validator = Yup.object({
    department: Yup.string().min(2, "Minimum 2 character").required("Required"),
});

const UpdateDepartment = () => {
    const { id } = useParams<{ id: string }>();
    const [input, setInput] = useState(initialValues);
    const history = useHistory();

    const {
        open,
        setOpen,
        handleClose,
        setSeverity,
        severity,
        message,
        setMessage,
    } = useSnackBar();
    const dispatch = useDispatch();

    const { lists } = useTypedSelector(getOneDepartmentSelector);
    const { success, success_message, errors } = useTypedSelector(
        updateDepartmentSelector
    );

    const submit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(
            updateDepartmentAction({
                id: id,
                department: values.department,
            })
        );
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    };
    useEffect(() => {
        dispatch(getOneDepartmentAction(id));
    }, []);

    useEffect(() => {
        if (success && success_message) {
            setOpen(true);
            setMessage(`${success_message} Added`);
            setSeverity("success");
            setTimeout(() => {
                history.push("/departments");
            }, 500);
        }
        if (errors) {
            setOpen(true);
            setMessage(`${errors.errors?.fail_message}`);
            setSeverity("error");
        }
    }, [success]);
    useEffect(() => {
        if (lists) {
            setInput({
                ...input,
                department: lists.department,
            });
        }
    }, [lists]);
    return (
        <AdminLayout title="Update Department">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">
                    Update Department
                </div>
                <SnackBar
                    open={open}
                    handleClose={handleClose}
                    severity={severity}
                    message={message}
                />
                <div className="flex flex-col">
                    <div className="h-20 w-full flex justify-center items-center">
                        <Formik
                            initialValues={input}
                            onSubmit={submit}
                            validationSchema={validator}
                            enableReinitialize
                        >
                            {({ isSubmitting, errors, values }) => (
                                <Form
                                    className="flex space-x-3 w-1/3"
                                    autoComplete="off"
                                >
                                    <MyTextInput
                                        name="department"
                                        type="text"
                                        placeholder="Add Department"
                                        id="department"
                                    />

                                    <button
                                        type="submit"
                                        className="py-2 bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out w-40 h-11"
                                        disabled={isSubmitting ? true : false}
                                    >
                                        {isSubmitting ? "Loading..." : "ADD"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateDepartment;
