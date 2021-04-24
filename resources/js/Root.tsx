import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/RegisterPage";

const LazyAddCategory = React.lazy(
    () => import("./Pages/Admin/Category/AddSubject")
);
const LazyListCategory = React.lazy(
    () => import("./Pages/Admin/Category/ListCategories")
);
const LazyDepartment = React.lazy(
    () => import("./Pages/Admin/Department/DepartmentMain")
);
const LazyUpdateDepartment = React.lazy(
    () => import("./Pages/Admin/Department/UpdateDepartment")
);
const LazySubject = React.lazy(
    () => import("./Pages/Admin/Subject/SubjectMain")
);

import AdminRoute from "./components/AdminRoute";
import NotFound from "./components/Shared/NotFound";
import Loading from "./components/reuseable/Loading";
import Home from "./Pages/Home";
const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
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
                <AdminRoute path="/departments" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyDepartment />
                    </Suspense>
                </AdminRoute>
                <AdminRoute path="/departments/:id" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyUpdateDepartment />
                    </Suspense>
                </AdminRoute>
                <AdminRoute path="/subjects" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyDepartment />
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
