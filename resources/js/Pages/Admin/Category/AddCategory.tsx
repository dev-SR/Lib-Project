import React, { useEffect, useState } from "react";
import axios from "axios";
import SnackBar, { useSnackBar } from "../../../components/reuseable/SnackBar";
import {
    Input,
    useInput,
    InputType,
} from "../../../components/reuseable/CustomInput";
import {
    useTypedSelector,
    addCategoryAction,
    addCategorySelector,
} from "../../../redux/store";
import { reset } from "../../../redux/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";

let inputArr: InputType[] = [
    { name: "name", value: "", label: "Category Name" },
];

const AddCategory = () => {
    const {
        open,
        setOpen,
        handleClose,
        setSeverity,
        severity,
        message,
        setMessage,
    } = useSnackBar();
    const { onChange, inputs } = useInput(inputArr);
    const dispatch = useDispatch();

    const { success, error, success_message } = useTypedSelector(
        addCategorySelector
    );

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategoryAction({ name: inputs[0].value }));
    };
    useEffect(() => {
        if (success) {
            setOpen(true);
            setMessage(`${success_message} Added`);
            setSeverity("success");
            dispatch(reset());
        } else {
            if (error && error.message) {
                setOpen(true);
                setMessage(`${error.errors.category_name[0]}`);
                setSeverity("error");
                dispatch(reset());
            }
        }
    }, [success, error]);

    return (
        <AdminLayout title="Category">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">Add Books</div>
                <SnackBar
                    open={open}
                    handleClose={handleClose}
                    severity={severity}
                    message={message}
                />
                <div className="flex justify-center items-center h-full">
                    <form
                        method="post"
                        className="sm:w-1/3 w-10/12 flex justify-center items-center flex-col space-y-4"
                        onSubmit={submit}
                    >
                        {inputs.map((input, index) => (
                            <Input
                                key={index}
                                name={input.name}
                                value={input.value}
                                label={input.label}
                                onchange={onChange}
                            />
                        ))}
                        <div className="w-full">
                            <button
                                type="submit"
                                className="bg-purple-600 py-2 flex items-center
                               justify-center w-full rounded text-purple-100 hover:bg-purple-500 focus:outline-none transition duration-300 ease-in-out"
                            >
                                ADD
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};
export default AddCategory;
