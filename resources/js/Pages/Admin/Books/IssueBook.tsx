import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { MyTextInput } from "../../../components/Formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

import {
    useTypedSelector,
    // deleteSubjectSelector,
    getIssuedBookAction,
    getIssuedBookSelector,
    addIssuedBookAction,
    addIssuedBookSelector,
    deleteIssuedBookSelector,
} from "../../../redux/store";
import { useDispatch } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";

import ListIssue from "./ListIssue";

type Values = {
    user_id: number;
    book_id: number;
};

const initialValues: Values = {
    user_id: 0,
    book_id: 0,
};
export const validator = Yup.object({
    user_id: Yup.number().required("Required"),
    book_id: Yup.number().required("Required"),
});

export const IssueBook = () => {
    const dispatch = useDispatch();

    const { success, success_message, errors } = useTypedSelector(
        addIssuedBookSelector
    );
    const { lists } = useTypedSelector(getIssuedBookSelector);
    const del = useTypedSelector(deleteIssuedBookSelector);
    const submit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(
            addIssuedBookAction({
                user_id: values.user_id,
                book_id: values.book_id,
            })
        );
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
        resetForm();
    };

    useEffect(() => {
        dispatch(getIssuedBookAction());
    }, []);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (success && success_message) {
            enqueueSnackbar(success_message, {
                variant: "success",
                autoHideDuration: 2000,
            });
        }
        if (del.success && del.success_message) {
            enqueueSnackbar(del.success_message, {
                variant: "success",
                autoHideDuration: 2000,
            });
        }
        if (errors) {
            if (errors.errors) {
                for (const [, value] of Object.entries(errors.errors)) {
                    enqueueSnackbar(`${value[0]}`, {
                        variant: "error",
                    });
                }
            }
        }
        if (!lists) dispatch(getIssuedBookAction());
    }, [success, errors, dispatch, lists]);

    return (
        <AdminLayout title="IssueBook">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">Subject</div>
                <div className="flex flex-col">
                    <div className="w-full flex justify-center items-center">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={submit}
                            validationSchema={validator}
                        >
                            {({ isSubmitting, errors, values }) => (
                                <Form
                                    className="flex space-y-3 w-1/3 flex-col"
                                    autoComplete="off"
                                >
                                    <MyTextInput
                                        name="user_id"
                                        type="text"
                                        placeholder="User ID"
                                        id="user_id"
                                        label="User Id"
                                    />
                                    <MyTextInput
                                        name="book_id"
                                        type="number"
                                        placeholder="Book ID"
                                        id="book_id"
                                        label="Book Id"
                                    />

                                    <button
                                        type="submit"
                                        className="py-2 bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out w-full"
                                        disabled={isSubmitting ? true : false}
                                    >
                                        {isSubmitting ? "Loading..." : "ADD"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div>{lists && <ListIssue lists={lists} />}</div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default IssueBook;
