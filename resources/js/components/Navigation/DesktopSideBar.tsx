import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    CategoryIcon,
    ListIcon,
} from "../../utils/icons/svg";
// import { LoremIpsum } from "react-lorem-ipsum";

const DesktopSideBar = () => {
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
                        className=" font-bold font-nunito flex items-center justify-center"
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
                            <DashboardIcon fill={"#0D9488"} />
                        </div>
                        <div className="text-teal-600 font-medium text-sm">
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="">
                    <Link to="/report" className="nav-links">
                        <div className=" nav-icons ">
                            <ReportIcon fill={undefined} />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            Reports
                        </div>
                    </Link>
                </div>
                <div className="">
                    <Link to="/get-category" className="nav-links">
                        <div className=" nav-icons ">
                            <ListIcon fill={undefined} />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            List Category
                        </div>
                    </Link>
                </div>
                <div className="">
                    <Link to="/add-category" className="nav-links">
                        <div className=" nav-icons ">
                            <CategoryIcon fill={undefined} />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            Add Category
                        </div>
                    </Link>
                </div>
                <div className="text-gray-400 font-medium pl-3 w-11/12 text-xs  pt-7 mb-2">
                    BOOKS
                </div>
                <div>
                    <Link to="/add-books" className="nav-links">
                        <div className="nav-icons ">
                            <AddIcon />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            Add Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/list-books" className="nav-links">
                        <div className="nav-icons ">
                            <CollectionIcon />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            List Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/issue-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardIcon />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            Issue Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/return-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardCopyIcon />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
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
                            <UserIcon />
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                            Add Users
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to="/add-users" className="nav-links">
                        <div className="nav-icons ">
                            <UserIcon />
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
