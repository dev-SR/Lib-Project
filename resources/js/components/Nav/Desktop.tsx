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
} from "../../utils/icons/svg";
import { LoremIpsum } from "react-lorem-ipsum";

const App = () => {
    return (
        <div className=" flex flex-col w-full mt-10 space-y-3 ">
            <div className="">
                <Link
                    to="/"
                    className="flex flex-col items-center justify-center mb-2"
                >
                    <div className="mb-1">
                        <AcademicCapIcon />
                    </div>
                    <div
                        style={{ color: "#0D9488" }}
                        className=" font-bold font-nunito border-b-2 border-gray-700 pb-4 w-10/12 flex justify-center"
                    >
                        <div>GREENLib</div>
                    </div>
                </Link>
            </div>
            <div className="overflow-y-auto navscroll px-4 flex flex-col space-y-2">
                <div>
                    <Link to="/dashboard" className="nav-links">
                        <div className=" nav-icons">
                            <DashboardIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="text-gray-600 font-medium pl-3">
                    MANAGE BOOKS
                </div>
                <div>
                    <Link to="/add-books" className="nav-links">
                        <div className="nav-icons ">
                            <AddIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            Add Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/list-books" className="nav-links">
                        <div className="nav-icons ">
                            <CollectionIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            List Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/issue-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            Issue Books
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/return-books" className="nav-links">
                        <div className="nav-icons ">
                            <ClipboardCopyIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            Return Books
                        </div>
                    </Link>
                </div>
                <div className="text-gray-600 font-medium pl-3">
                    MANAGE MEMBERS
                </div>

                <div>
                    <Link to="/add-users" className="nav-links">
                        <div className="nav-icons ">
                            <UserIcon />
                        </div>
                        <div className="text-gray-300 font-medium">
                            Add Users
                        </div>
                    </Link>
                </div>
                {/* <LoremIpsum p={5} /> */}
            </div>
        </div>
    );
};

export default App;
