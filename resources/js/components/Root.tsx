import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AddBooks } from "./Admin/Books/AddBooks";
import DesktopNav from "./Navigation/DesktopSideBar";
import Navigation from "./Navigation/Navigation";
import AddCategory from "./Admin/Category/AddCategory";
import Login from "./Auth/LoginPage";
const LazyDashboard = React.lazy(() => import("./Admin/Dashboard"));
import AdminRoute from "../utils/AdminRoute";
const App = () => {
    return (
        <div className="bg-teal-100">
            <div className="h-screen flex sm:flex-row flex-col-reverse overflow-y-hidden blur">
                <Router>
                    <div className="sm:w-64 sm:h-full h-10">
                        <div className="h-full sm:hidden flex">Mobile Menu</div>
                        <div className="w-full h-full hidden sm:flex  overflow-y-hidden ">
                            <DesktopNav />
                        </div>
                    </div>
                    <div className="sm:w-full sm:h-full h-full overflow-y-hidden flex flex-col ">
                        <Navigation />
                        <Route path="/dashboard">
                            <React.Suspense fallback={<p>Loading..</p>}>
                                <LazyDashboard />
                            </React.Suspense>
                        </Route>
                        <Route path="/add-books">
                            <AddBooks />
                        </Route>
                        {/* <Route path="/add-category">
                            <React.Suspense fallback={<p>Loading..</p>}>
                                <AddCategory />
                            </React.Suspense>
                        </Route> */}
                        <Route path="/login">
                            <Login />
                        </Route>
                        <AdminRoute path="/add-category" exact>
                            <AddCategory />
                        </AdminRoute>
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default App;
