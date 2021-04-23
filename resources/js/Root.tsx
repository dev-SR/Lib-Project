import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/RegisterPage";

const LazyAddCategory = React.lazy(
    () => import("./Pages/Admin/Category/AddCategory")
);
const LazyListCategory = React.lazy(
    () => import("./Pages/Admin/Category/ListCategories")
);

import AdminRoute from "./components/AdminRoute";
import NotFound from "./components/Shared/NotFound";
import Loading from "./components/reuseable/Loading";
const App = () => {
    return (
        <Router>
            <Switch>
                <AdminRoute path="/" exact>
                    {() => <h1>Home</h1>}
                </AdminRoute>
                <AdminRoute path="/add-category" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyAddCategory />
                    </Suspense>
                </AdminRoute>
                <AdminRoute path="/get-category" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyListCategory />
                    </Suspense>
                </AdminRoute>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="*" exact>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
