import React, { useEffect, useState } from "react";
import axios from "axios";
import SnackBar, { useSnackBar } from "../../../utils/reuseable/SnackBar";
import {
    Input,
    useInput,
    InputType,
} from "../../../utils/reuseable/CustomInput";
import {
    useTypedSelector,
    addCategoryAction,
    addCategoryErrorSelector,
    addCategoryStatusSelector,
    addCategorySuccessSelector,
} from "../../../redux/store";
import { reset } from "../../../redux/category";
import { useDispatch, useSelector } from "react-redux";

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

    const success = useTypedSelector(addCategorySuccessSelector);
    const error = useTypedSelector(addCategoryErrorSelector);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategoryAction({ name: inputs[0].value }));
    };
    useEffect(() => {
        if (success) {
            setOpen(true);
            setMessage("Added");
            setSeverity("success");
            dispatch(reset());
        } else {
            if (error && error.message) {
                setOpen(true);
                setMessage("Faild");
                setSeverity("error");
                dispatch(reset());
            }
        }
    }, [success, error]);

    return (
        <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
            <div className="text-md font-thin text-gray-700">Add Books</div>
            <SnackBar
                open={open}
                handleClose={handleClose}
                severity={severity}
                message={message}
            />
            <div className="flex justify-center items-center h-full">
                {success}
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
    );
};
export default AddCategory;
