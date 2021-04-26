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
const LazyUpdateBooks = React.lazy(
    () => import("./Pages/Admin/Books/UpdateBooks")
);
const UserDashboard = React.lazy(() => import("./Pages/User/UserDashboard"));
// import UserDashboard from "./Pages/User/UserDashboard";

import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

import NotFound from "./components/Shared/NotFound";
import Loading from "./components/reuseable/Loading";
import Home from "./Pages/Home";
import UserHome from "./Pages/UserHome";

import { loginSelector, useTypedSelector } from "./redux/store";
import CartPage from "./Pages/User/CartPage";
const App = () => {
    // localStorage.removeItem("GreenLibToken");
    // localStorage.removeItem("UserInfo");
    const u = useTypedSelector(loginSelector);

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    {u.user ? <UserHome /> : <Home />}
                </Route>
                <Route path="/cart" exact>
                    <CartPage />
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
                <AdminRoute path="/books/:id" exact>
                    <Suspense fallback={<Loading />}>
                        <LazyUpdateBooks />
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
                <UserRoute path="/user/dashboard">
                    <Suspense fallback={<Loading />}>
                        <UserDashboard />
                    </Suspense>
                </UserRoute>
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
