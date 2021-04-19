import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AddBooks } from "./Pages/Admin/Books/AddBooks";
import DesktopNav from "./components/Navigation/DesktopSideBar";
import Navigation from "./components/Navigation/Navigation";
import AddCategory from "./Pages/Admin/Category/AddCategory";
import Login from "./Pages/Auth/LoginPage";
const LazyDashboard = React.lazy(() => import("./Pages/Admin/Dashboard"));
const LazyAddCategory = React.lazy(
    () => import("./Pages/Admin/Category/AddCategory")
);

import AdminRoute from "./utils/AdminRoute";
import Layout from "./components/Shared/Layout";
import NotFound from "./components/Shared/NotFound";
const App = () => {
    return (
        <Router>
            <Switch>
                <AdminRoute path="/" exact>
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <LazyAddCategory />
                    </Suspense>
                </AdminRoute>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="*" exact>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
