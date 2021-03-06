import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { MyTextInput } from "../../../components/Formik";
import * as Yup from "yup";
import SnackBar, { useSnackBar } from "../../../components/reuseable/SnackBar";

import {
    useTypedSelector,
    addDepartmentAction,
    addDepartmentSelector,
    getDepartmentSelector,
    getDepartmentAction,
    deleteDepartmentSelector,
} from "../../../redux/store";
import { useDispatch } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";

import ListDepartment from "./ListDepartment";

type Values = {
    department: string;
};

const initialValues: Values = {
    department: "",
};
export const validator = Yup.object({
    department: Yup.string().min(2, "Minimum 2 character").required("Required"),
});

export const Department = () => {
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

    const { success, success_message, errors } = useTypedSelector(
        addDepartmentSelector
    );
    const { lists } = useTypedSelector(getDepartmentSelector);
    const del = useTypedSelector(deleteDepartmentSelector);
    const submit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(addDepartmentAction(values));
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
        resetForm();
    };

    useEffect(() => {
        dispatch(getDepartmentAction());
    }, []);
    useEffect(() => {
        if (success && success_message) {
            setOpen(true);
            setMessage(`${success_message} Added`);
            setSeverity("success");
        }
        if (del.success && del.success_message) {
            setOpen(true);
            setMessage(`${del.success_message}`);
            setSeverity("warning");
        }
        if (errors) {
            setOpen(true);
            setMessage(`${errors.errors?.fail_message}`);
            setSeverity("error");
        }
        if (!lists) dispatch(getDepartmentAction());
    }, [success, errors, lists, del.success, dispatch]);

    return (
        <AdminLayout title="Department">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">
                    Department
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
                            initialValues={initialValues}
                            onSubmit={submit}
                            validationSchema={validator}
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
                                        disabled={
                                            isSubmitting || errors.department
                                                ? true
                                                : false
                                        }
                                    >
                                        {isSubmitting ? "Loading..." : "ADD"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div>{lists && <ListDepartment lists={lists} />}</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Department;
