import { Form, Formik, FormikHelpers } from "formik";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { MyTextInput } from "../../components/Formik";
import * as Yup from "yup";

import {
    loginAction,
    useTypedSelector,
    loginSelector,
} from "../../redux/store";
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
});

const Login: FC<{}> = () => {
    const dispatch = useDispatch();
    const u = useTypedSelector(loginSelector);
    const history = useHistory();
    const handleSubmit = (
        values: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>
    ) => {
        dispatch(loginAction({ ...values }));
        setSubmitting(true);
    };
    useEffect(() => {
        if (u.is_admin) {
            history.push("/add-category");
        }
    }, [u]);
    return (
        <div className="flex flex-col h-screen justify-center items-center  bg-gradient-to-tr from-teal-100 to-purple-100">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validator}
            >
                {({ isSubmitting, errors }) => (
                    <Form
                        className="w-2/5 sm:w-1/3 flex flex-col space-y-2"
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
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
