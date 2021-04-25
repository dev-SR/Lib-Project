import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AcademicCapIcon,
    DashboardIcon,
    ReportIcon,
} from "../../utils/icons/svg";

const DesktopSideBar = () => {
    const l = useLocation();
    const p = l.pathname;

    const isPath = (path: string): boolean => {
        return p === path;
    };

    return (
        <div className=" flex flex-col w-full  space-y-3 ">
            <div className="">
                <Link
                    to="/"
                    className="flex items-center border-b h-12 space-x-2 px-4"
                >
                    <div className="">
                        <AcademicCapIcon fill={"#0D9488"} />
                    </div>
                    <div
                        style={{ color: "#0D9488" }}
                        className="font-bold font-nunito flex items-center justify-center"
                    >
                        GREENLib
                    </div>
                </Link>
            </div>
            <div className="overflow-y-auto navscroll px-4 flex flex-col ">
                <div className="text-gray-400 font-medium pl-3 w-11/12 text-xs  pt-7">
                    MENU
                </div>
                <div className="mt-5">
                    <Link to="/user/dashboard" className="nav-links">
                        <div className=" nav-icons ">
                            <DashboardIcon
                                fill={`${
                                    isPath("/user/dashboard")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/user/dashboard")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Dashboard
                        </div>
                    </Link>
                </div>

                <div className="">
                    <Link to="/user/return" className="nav-links">
                        <div className=" nav-icons ">
                            <ReportIcon
                                fill={`${
                                    isPath("/user/return")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/user/return")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Return Books
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DesktopSideBar;
