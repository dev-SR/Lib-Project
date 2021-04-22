import React from "react";
import { LogoutIcon } from "../../utils/icons/svg";
import Api from "../../redux/axios_config";
import { logoutAction } from "../../redux/store";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

export default function Navigation() {
    let history = useHistory();
    let dispatch = useDispatch();
    const logoutHandler = () => {
        // await Api.post(`/logout`);
        dispatch(logoutAction()); //reset login
        // history.push("/login");
    };
    return (
        <div className="bg-white h-12 w-full border-b flex-shrink-0 flex  items-center px-4 space-x-4  justify-end">
            <div className="w-60 flex justify-center">
                <input
                    type="text"
                    placeholder="search..."
                    className="py-1 bg-gray-100 border-gray-200
                    focus:border-gray-500
                    focus:ring-gray-700 w-40 rounded-md focus:w-60 placeholder-gray-300 transition ease-in-out"
                />
            </div>
            <div>
                <button
                    className="h-8 w-8  bg-gray-200 flex justify-center items-center rounded-full focus:outline-none hover:bg-gray-300 shadow"
                    onClick={logoutHandler}
                >
                    <LogoutIcon />
                </button>
            </div>
        </div>
    );
}
