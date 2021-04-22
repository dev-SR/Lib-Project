import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useTypedSelector, loginSelector } from "../redux/store";
const AdminRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
    const u = useTypedSelector(loginSelector);
    if (u.token && u.is_admin && u.user) {
        return <Route {...routeProps} />;
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                }}
            />
        );
    }
};
export default AdminRoute;
