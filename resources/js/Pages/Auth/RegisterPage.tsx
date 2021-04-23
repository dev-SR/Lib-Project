import { Form, Formik, FormikHelpers } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { MyTextInput } from "../../components/Formik";
import * as Yup from "yup";

import {
    loginAction,
    useTypedSelector,
    loginSelector,
    registerAction,
    registerSelector,
} from "../../redux/store";
import SnackBar, { useSnackBar } from "../../components/reuseable/SnackBar";
import { Link } from "react-router-dom";
type Values = {
    email: string;
    password: string;
    id: string;
    name: string;
    password_confirmation: string;
};

const initialValues: Values = {
    email: "",
    id: "",
    name: "",
    password: "",
    password_confirmation: "",
};

export const validator = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    id: Yup.string().min(9, "Minimum 9 character").required("Required"),
    password: Yup.string().min(3, "Minimum 3 character").required("Required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

const Register: FC<{}> = () => {
    const dispatch = useDispatch();
    const u = useTypedSelector(registerSelector);
    const history = useHistory();
    const {
        open,
        setOpen,
        setSeverity,
        handleClose,
        severity,
        message,
        setMessage,
    } = useSnackBar();
    const handleSubmit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(registerAction({ ...values }));
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    };

    useEffect(() => {
        if (u.is_admin) {
            history.push("/add-category");
        }
        if (u.error && u.error.message) {
            setOpen(true);
            setMessage(`${u.error.message}`);
            setSeverity("error");
        }
        if (u.user && u.token) {
            setOpen(true);
            setMessage(`Account Created Successfully`);
            setSeverity("success");
        }
    }, [u]);
    return (
        <div className="flex flex-col h-screen justify-center items-center  bg-gradient-to-tr from-teal-100 to-purple-100 overflow-y-auto">
            <SnackBar
                open={open}
                handleClose={handleClose}
                severity={severity}
                message={message}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validator}
            >
                {({ isSubmitting, errors, values }) => (
                    <Form
                        className="w-2/5 sm:w-1/3 flex flex-col space-y-2 mt-10"
                        autoComplete="off"
                    >
                        <MyTextInput
                            name="id"
                            type="text"
                            placeholder="191902061"
                            id="id"
                        />

                        <MyTextInput
                            name="name"
                            type="text"
                            placeholder="Jhon"
                            id="name"
                        />

                        <MyTextInput
                            name="email"
                            type="email"
                            placeholder="jhon@gmail.com"
                            id="email"
                        />
                        <MyTextInput
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                        <MyTextInput
                            name="password_confirmation"
                            type="password"
                            id="password_confirmation"
                            placeholder="Confirm Password"
                        />
                        <button
                            type="submit"
                            className=" py-2 w-full bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out"
                            disabled={
                                isSubmitting || errors.email ? true : false
                            }
                        >
                            {isSubmitting ? "Loading..." : "Register"}
                        </button>

                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
