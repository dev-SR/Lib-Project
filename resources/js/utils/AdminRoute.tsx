import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useTypedSelector, isLoggedSelector } from "../redux/store";
const PrivateRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
    const isLogged = useTypedSelector(isLoggedSelector);
    if (isLogged) {
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
export default PrivateRoute;
