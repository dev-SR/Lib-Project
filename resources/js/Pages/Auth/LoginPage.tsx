import { Form, Formik, FormikHelpers } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { MyTextInput } from "../../components/Formik";
import * as Yup from "yup";
import SEO from "../../components/Shared/SEO";

import {
    loginAction,
    useTypedSelector,
    loginSelector,
} from "../../redux/store";
import SnackBar, { useSnackBar } from "../../components/reuseable/SnackBar";
import { Link } from "react-router-dom";
type Values = {
    email: string;
    password: string;
};

const initialValues: Values = {
    email: "",
    password: "",
};

export const validator = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(3, "Minimum 3 character").required("Required"),
});

const Login: FC<{}> = () => {
    const dispatch = useDispatch();
    const u = useTypedSelector(loginSelector);
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
        dispatch(loginAction({ ...values }));
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 500);
    };

    useEffect(() => {
        if (u.is_admin) {
            history.push("/departments");
        }
        if (u.token && !u.is_admin) {
            history.push("/user/dashboard");
        }
        if (u.error && u.error.message) {
            setOpen(true);
            setMessage(`${u.error.message}`);
            setSeverity("error");
        }
    }, [u]);
    return (
        <div className="flex flex-col h-screen justify-center items-center  bg-gradient-to-tr from-teal-100 to-purple-100">
            <SEO title="Login" />
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
                {({ isSubmitting, errors }) => (
                    <Form
                        className="sm:w-1/3 w-4/5 flex flex-col space-y-2"
                        autoComplete="off"
                    >
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
                        <button
                            type="submit"
                            className=" py-2 w-full bg-purple-500 text-white disabled:opacity-50 rounded hover:bg-purple-600 transition ease-in-out"
                            disabled={
                                isSubmitting || errors.email ? true : false
                            }
                        >
                            {isSubmitting ? "Loading..." : "Login"}
                        </button>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                        <div>
                            <Link
                                to="/register"
                                className="text-xs text-purple-500"
                            >
                                Register
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
