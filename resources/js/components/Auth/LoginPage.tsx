import React from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/store";

export default function Login() {
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginAction({ name: "" }));
    };
    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}
