import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DesktopNav from "./Nav/Desktop";

const LazyDashaord = React.lazy(() => import("./Main/Dashboard"));

const App = () => {
    return (
        <div className="h-screen bg flex sm:flex-row flex-col-reverse overflow-y-hidden">
            <Router>
                <div className="sm:w-64 sm:h-full h-10">
                    <div className="h-full sm:hidden flex text-white">
                        Mobile Menu
                    </div>
                    <div className="sidebar border-r-2 border-gray-800 shadow w-full h-full hidden sm:flex text-white overflow-y-hidden">
                        <DesktopNav />
                    </div>
                </div>
                <div className="sm:w-full sm:h-full h-full text-white overflow-y-hidden flex flex-col">
                    <div className="overflow-y-auto p-3 mainscroll">
                        <Route path="/dashboard">
                            <React.Suspense fallback={<p>Loading..</p>}>
                                <LazyDashaord />
                            </React.Suspense>
                        </Route>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
