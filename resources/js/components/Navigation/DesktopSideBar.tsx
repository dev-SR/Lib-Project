import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AcademicCapIcon,
    AddIcon,
    CollectionIcon,
    DashboardIcon,
    ClipboardCopyIcon,
    ClipboardIcon,
    UsersIcon,
    UserIcon,
    ReportIcon,
    DepartmentIcon,
    ListIcon,
    BookIcon,
} from "../../utils/icons/svg";
// import { LoremIpsum } from "react-lorem-ipsum";

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
                    <Link to="/dashboard" className="nav-links">
                        <div className=" nav-icons ">
                            <DashboardIcon
                                fill={`${
                                    isPath("/dashboard") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/dashboard")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Dashboard
                        </div>
                    </Link>
                </div>

                <div className="">
                    <Link to="/report" className="nav-links">
                        <div className=" nav-icons ">
                            <ReportIcon
                                fill={`${
                                    isPath("/report") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/report")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Reports
                        </div>
                    </Link>
                </div>
                <div className="">
                    <Link to="/departments" className="nav-links">
                        <div className=" nav-icons ">
                            <DepartmentIcon
                                fill={`${
                                    isPath("/departments")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/departments")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Departments
                        </div>
                    </Link>
                </div>
                <div className="">
                    <Link to="/subjects" className="nav-links">
                        <div className=" nav-icons ">
                            <DashboardIcon
                                fill={`${
                                    isPath("/subjects") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/subjects")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Subject
                        </div>
                    </Link>
                </div>
                <div className="text-gray-400 font-medium pl-3 w-11/12 text-xs  pt-7 mb-2">
                    BOOKS
                </div>
                <div>
                    <Link to="/books" className="nav-links">
                        <div className="nav-icons ">
                            <BookIcon
                                fill={`${
                                    isPath("/books") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/add-books")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Add Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/books/lists" className="nav-links">
                        <div className="nav-icons ">
                            <CollectionIcon
                                fill={`${
                                    isPath("//list-books")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/list-books")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            List Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/issue-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardIcon
                                fill={`${
                                    isPath("/issue-books")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/issue-books")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Issue Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/return-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardCopyIcon
                                fill={`${
                                    isPath("/return-books")
                                        ? "#0D9488"
                                        : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/return-books")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Return Books
                        </div>
                    </Link>
                </div>
                <div className="text-gray-400 font-medium pl-3 w-11/12 text-xs mb-2  pt-7">
                    MEMBERS
                </div>
                <div>
                    <Link to="/add-users" className="nav-links">
                        <div className="nav-icons ">
                            <UserIcon
                                fill={`${
                                    isPath("/add-users") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div
                            className={` font-medium text-sm ${
                                isPath("/add-users")
                                    ? "text-teal-600"
                                    : "text-gray-600 "
                            }`}
                        >
                            Add Users
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to="/add-users" className="nav-links">
                        <div className="nav-icons ">
                            <UserIcon
                                fill={`${
                                    isPath("/dashboard") ? "#0D9488" : "#A1A1AA"
                                }`}
                            />
                        </div>
                        <div className="text-gray-600 sm:font-medium text-sm">
                            Add Users
                        </div>
                    </Link>
                </div>
                {/* <LoremIpsum p={5} /> */}
            </div>
        </div>
    );
};

export default DesktopSideBar;
