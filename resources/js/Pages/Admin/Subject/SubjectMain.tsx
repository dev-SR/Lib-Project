import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { MyTextInput } from "../../../components/Formik";
import * as Yup from "yup";
import SnackBar, { useSnackBar } from "../../../components/reuseable/SnackBar";

import {
    useTypedSelector,
    getSubjectSelector,
    deleteSubjectSelector,
    addSubjectAction,
    addSubjectSelector,
    getSubjectAction,
} from "../../../redux/store";
import { useDispatch } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";

import ListSubject from "./ListSubject";

type Values = {
    subject: string;
    department: string;
};

const initialValues: Values = {
    subject: "",
    department: "",
};
export const validator = Yup.object({
    subject: Yup.string().min(2, "Minimum 2 character").required("Required"),
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
        addSubjectSelector
    );
    const { lists } = useTypedSelector(getSubjectSelector);
    const del = useTypedSelector(deleteSubjectSelector);
    const submit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(addSubjectAction(values));
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
        resetForm();
    };

    useEffect(() => {
        dispatch(getSubjectAction());
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
        if (!lists) dispatch(getSubjectAction());
    }, [success, errors, lists, del.success, dispatch]);

    return (
        <AdminLayout title="Department">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">Subject</div>
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
                                        name="subject"
                                        type="text"
                                        placeholder="Add Course"
                                        id="subject"
                                    />
                                    <MyTextInput
                                        name="department"
                                        type="text"
                                        placeholder="Department"
                                        id="department"
                                    />

                                    <button
                                        type="submit"
                                        className="py-2 bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out w-40 h-11"
                                        disabled={
                                            isSubmitting || errors.subject
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
                    <div>{lists && <ListSubject lists={lists} />}</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Department;
