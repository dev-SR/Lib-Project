import React from "react";
import { useHistory } from "react-router";

export default function NotFound() {
    const history = useHistory();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push("/");
    };
    return (
        <div className="flex flex-col justify-center items-center bg-teal-800 h-screen">
            <div className="w-1/2 sm:w-1/3 flex items-center flex-col space-y-7">
                <h1 className="text-2xl text-gray-300">
                    {" "}
                    This Page Doesn't Exit
                </h1>
                <form method="post" onSubmit={handleSubmit} className="w-full">
                    <button
                        type="submit"
                        className="bg-yellow-400 py-2 w-full rounded-md hover:bg-yellow-300 transition-colors ease-out"
                    >
                        GO TO HOME
                    </button>
                </form>
            </div>
        </div>
    );
}
