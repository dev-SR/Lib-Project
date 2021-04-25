import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/RegisterPage";

const LazyDepartment = React.lazy(
    () => import("./Pages/Admin/Department/DepartmentMain")
);
const LazyUpdateDepartment = React.lazy(
    () => import("./Pages/Admin/Department/UpdateDepartment")
);
const LazySubject = React.lazy(
    () => import("./Pages/Admin/Subject/SubjectMain")
);
const LazyUpdateSubject = React.lazy(
    () => import("./Pages/Admin/Subject/UpdateSubject")
);
const LazyBooks = React.lazy(() => import("./Pages/Admin/Books/BooksMain"));
const LazyListBooks = React.lazy(() => import("./Pages/Admin/Books/ListBooks"));

import AdminRoute from "./components/AdminRoute";
import NotFound from "./components/Shared/NotFound";
import Loading from "./components/reuseable/Loading";
import Home from "./Pages/Home";
const App = () => {
    // localStorage.removeItem("GreenLibToken");
    // localStorage.removeItem("UserInfo");
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <AdminRoute path="/books" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyBooks />
                    </Suspense>
                </AdminRoute>
                <AdminRoute path="/books-lists" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyListBooks />
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
                        <LazySubject />
                    </Suspense>
                </AdminRoute>
                <AdminRoute path="/subjects/:id" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyUpdateSubject />
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
