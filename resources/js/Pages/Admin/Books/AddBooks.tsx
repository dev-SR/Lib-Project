import React from "react";
import axios from "axios";
import SnackBar, { useSnackBar } from "../../../utils/reuseable/SnackBar";
import {
    Input,
    useInput,
    InputType,
} from "../../../utils/reuseable/CustomInput";

let inputArr: InputType[] = [
    { name: "name", value: "", label: "Category Name" },
];

export const AddBooks = () => {
    const { open, setOpen, handleClose } = useSnackBar();
    const { onChange, inputs } = useInput(inputArr);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(inputs);

        try {
            let {
                data,
            } = await axios.post("http://127.0.0.1:8000/api/add-category", {
                ...inputs[0],
            });
            console.log(data);
            setOpen(true);
        } catch (e) {
            console.log(e.response.data.errors);
            setOpen(true);
        }
    };

    return (
        <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
            <div className="text-md font-thin text-gray-700">Add Books</div>
            <SnackBar open={open} handleClose={handleClose} />
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
    );
};
