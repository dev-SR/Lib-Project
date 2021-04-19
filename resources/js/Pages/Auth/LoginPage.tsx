import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
    loginAction,
    useTypedSelector,
    isLoggedSelector,
} from "../../redux/store";

export default function Login() {
    const dispatch = useDispatch();
    const isLogged = useTypedSelector(isLoggedSelector);

    const history = useHistory();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAction({ name: "" }));
    };
    useEffect(() => {
        if (isLogged) {
            history.push("/");
        }
    }, [isLogged]);
    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}
