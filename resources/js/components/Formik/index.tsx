import React, { FC } from "react";

import { Field, useField, FieldAttributes } from "formik";
// import * as Yup from "yup";
// export const validator = Yup.object({
//     name: Yup.string().min(3, "Must be at least 3 char").required("Required"),
//     email: Yup.string().email("Invalid email address").required("Required"),
//     single_checkbox: Yup.boolean()
//         .oneOf([true], "You must accept")
//         .required("Required"),
//     select: Yup.string().oneOf(["red", "green", "blue"]).required("Required"),
//     group_checkbox: Yup.array()
//         .min(1, "You can't leave this blank.")
//         .required("You can't leave this blank.")
//         .nullable(),
//     radio: Yup.string()
//         .oneOf(["student", "teacher"], "You must accept")
//         .required("Required"),
// });
type MyTextInputProps = { label?: string } & FieldAttributes<{}>;
export const MyTextInput: React.FC<MyTextInputProps> = ({
    label,
    ...props
}) => {
    const [field, meta] = useField(props);
    return (
        <>
            {label && (
                <label className="text-xs" htmlFor={props.id || props.name}>
                    {label}
                </label>
            )}
            <Field {...field} {...props} className="input-primary" />
            {meta.touched && meta.error && (
                <div className="text-red-400 text-xs">{meta.error}</div>
            )}
        </>
    );
};

export const RadioBox: FC<FieldAttributes<{}>> = ({ children, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            {
                <label className="text-yellow-100 text-xs flex items-center space-x-2">
                    <Field type="radio" {...field} {...props} />
                    <div className="text-gray-100">{children}</div>
                </label>
            }
            {meta.touched && meta.error && (
                <div className="text-red-400 text-xs">{meta.error}</div>
            )}
        </>
    );
};
