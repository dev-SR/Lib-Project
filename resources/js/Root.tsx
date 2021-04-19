import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Auth/LoginPage";
const LazyAddCategory = React.lazy(
    () => import("./Pages/Admin/Category/AddCategory")
);
import AdminRoute from "./utils/AdminRoute";
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
