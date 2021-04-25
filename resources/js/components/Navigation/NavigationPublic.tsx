import React, { useEffect } from "react";
import { LogoutIcon } from "../../utils/icons/svg";
import Api from "../../redux/axios_config";
import {
    logoutAction,
    logoutSelector,
    useTypedSelector,
    resetLogout,
    loginSelector,
} from "../../redux/store";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Navigation() {
    let dispatch = useDispatch();
    const history = useHistory();
    const message = useTypedSelector(logoutSelector);
    const u = useTypedSelector(loginSelector);

    const logoutHandler = () => {
        dispatch(logoutAction());
    };
    useEffect(() => {
        if (message) {
            dispatch(resetLogout());
            history.push("/login");
        }
    }, [message]);
    return (
        <div className="bg-white h-12 w-full border-b flex-shrink-0 flex  items-center px-4 space-x-4  justify-end">
            <div>
                {!u.user && (
                    <Link
                        to="/login"
                        className="py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition ease-in-out px-2"
                    >
                        LOGIN
                    </Link>
                )}
                {u.user && (
                    <button
                        className="h-8 w-8  bg-gray-200 flex justify-center items-center rounded-full focus:outline-none hover:bg-gray-300 shadow"
                        onClick={logoutHandler}
                    >
                        <LogoutIcon />
                    </button>
                )}
            </div>
        </div>
    );
}
