import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
    loginAction,
    useTypedSelector,
    loginSelector,
} from "../../redux/store";

export default function Login() {
    const dispatch = useDispatch();
    const u = useTypedSelector(loginSelector);

    const history = useHistory();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAction({ email: "test@gmail.com", password: "test" }));
    };
    useEffect(() => {
        if (u.is_admin) {
            history.push("/add-category");
        }
    }, [u]);
    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}
