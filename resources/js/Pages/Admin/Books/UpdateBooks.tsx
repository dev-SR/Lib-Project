import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import React, { FC, useEffect, useState } from "react";
import { MyTextInput, MySelect } from "../../../components/Formik";
import * as Yup from "yup";
import SnackBar, { useSnackBar } from "../../../components/reuseable/SnackBar";

import {
    useTypedSelector,
    getSubjectAction,
    getSubjectSelector,
    addBookAction,
    resetAddBook,
    getBookSelector,
    getSingleBookAction,
    getSingleBookSelector,
    updateBookAction,
    updateBookSelector,
} from "../../../redux/store";
import { useDispatch } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";
import { Subject } from "../../../redux/subject";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

interface Values {
    book_id: number;
    title: string;
    isbn: string;
    publisher: string;
    authors: string;
    price: number;
    pages: number;
    copies: number;
    shelf_no: number;
    subject: string;
    department: string;
    img: string;
    edition: number;
}
const initialValues = {
    book_id: 0,
    title: "",
    isbn: "",
    publisher: "",
    authors: "",
    price: 0,
    pages: 0,
    copies: 0,
    shelf_no: 0,
    subject: "",
    department: "",
    img: "",
    edition: 0,
} as Values;
export const validator = Yup.object({
    book_id: Yup.number().required("Required"),
    title: Yup.string().required("Required"),
    isbn: Yup.string().required("Required"),
    publisher: Yup.string().required("Required"),
    authors: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    pages: Yup.number().required("Required"),
    copies: Yup.number().required("Required"),
    shelf_no: Yup.number().required("Required"),
    img: Yup.string().required("Required"),
    edition: Yup.number().required("Required"),
    subject: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
});

interface Props {
    lists: Subject[];
}

const InnerForm: FC<Props> = ({ lists }) => {
    const { values, setValues, isSubmitting } = useFormikContext<Values>();
    //Update Department according to subject
    let [dep, setDep] = useState<string>("");
    useEffect(() => {
        if (values.subject) {
            let selected = lists?.filter((r) => r.subject === values.subject);
            if (selected) {
                let s = selected[0].department as { department: string };
                setDep(s.department);
                setValues({
                    ...values,
                    department: s.department,
                });
            }
        }
    }, [values.subject]);
    return (
        <div className="flex flex-col space-y-3">
            <div className="flex justify-center space-x-3">
                <MySelect label="Select Subject" name="subject">
                    {lists &&
                        lists.map((s) => (
                            <option value={s.subject} key={s.id}>
                                {s.subject}
                            </option>
                        ))}
                </MySelect>
                <MySelect label="Select Department" name="department">
                    <option value={dep}>{dep}</option>
                </MySelect>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="py-2 bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out w-40 h-11 focus:outline-none"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "SUBMIT"}
                </button>
            </div>
        </div>
    );
};

export const Books = () => {
    const { id } = useParams<{ id: string }>();
    const submit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        setSubmitting(true);
        dispatch(updateBookAction(values));

        setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            // resetForm();
        }, 300);
    };

    const book = useTypedSelector(getSingleBookSelector);
    const { lists } = useTypedSelector(getSubjectSelector);
    const { success, success_message, errors } = useTypedSelector(
        updateBookSelector
    );

    const [input, setInput] = useState(initialValues);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubjectAction());
        dispatch(getSingleBookAction(id));
    }, []);
    useEffect(() => {
        if (book.lists) {
            setInput({
                ...input,
                ...book.lists,
            });
        }
        console.log(input);
    }, [book.lists]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (success && success_message) {
            enqueueSnackbar(success_message, {
                variant: "success",
                autoHideDuration: 2000,
            });
            dispatch(resetAddBook());
        }
        if (errors) {
            if (errors.errors) {
                for (const [, value] of Object.entries(errors.errors)) {
                    enqueueSnackbar(`${value[0]}`, {
                        variant: "error",
                    });
                }
                dispatch(resetAddBook());
            }
        }
    }, [success, errors, dispatch]);

    return (
        <AdminLayout title="Update-Books">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">
                    Update Book
                </div>

                <div className="flex flex-col">
                    <div className="w-full flex justify-center items-center flex-col">
                        <Formik
                            initialValues={input}
                            onSubmit={submit}
                            validationSchema={validator}
                            enableReinitialize
                        >
                            <Form
                                className="flex space-y-3 w-1/2 flex-col"
                                autoComplete="off"
                            >
                                <MyTextInput
                                    name="title"
                                    type="text"
                                    label="Title"
                                    placeholder="Introduction To Programming"
                                    id="title"
                                />
                                <MyTextInput
                                    name="img"
                                    type="text"
                                    label="Image"
                                    placeholder="Image"
                                    id="img"
                                />
                                <MyTextInput
                                    name="isbn"
                                    type="text"
                                    placeholder="978-3-16-148410-0"
                                    label="ISBN"
                                    id="isbn"
                                />
                                <MyTextInput
                                    name="publisher"
                                    type="text"
                                    label="Publisher"
                                    placeholder="Publisher"
                                    id="publisher"
                                />
                                <MyTextInput
                                    name="authors"
                                    type="text"
                                    label="Author"
                                    placeholder="Author Name"
                                    id="authors"
                                />
                                <div className="flex justify-center space-x-3">
                                    <MyTextInput
                                        name="book_id"
                                        type="number"
                                        label="Book Id"
                                        placeholder="book_id"
                                        id="book_id"
                                    />
                                    <MyTextInput
                                        name="price"
                                        label="Price"
                                        type="number"
                                        placeholder="price"
                                        id="price"
                                        max="500"
                                    />
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <MyTextInput
                                        name="pages"
                                        type="number"
                                        label="Pages"
                                        placeholder="pages"
                                        id="pages"
                                    />
                                    <MyTextInput
                                        name="copies"
                                        type="number"
                                        label="Copies"
                                        placeholder="copies"
                                        id="copies"
                                    />
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <MyTextInput
                                        name="edition"
                                        type="number"
                                        label="Edition"
                                        placeholder="edition"
                                        id="edition"
                                    />
                                    <MyTextInput
                                        name="shelf_no"
                                        type="number"
                                        label="Shelf No."
                                        placeholder="shelf_no"
                                        id="shelf_no"
                                    />
                                </div>

                                {lists && <InnerForm lists={lists} />}
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Books;
