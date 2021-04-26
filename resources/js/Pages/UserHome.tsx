import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMuiPagination } from "../components/reuseable/Pagination";
import UserLayout from "../components/Shared/UserLayout";
import {
    getBookAction,
    getBookSelector,
    useTypedSelector,
} from "../redux/store";

const UserHome = () => {
    const dispatch = useDispatch();
    const { lists } = useTypedSelector(getBookSelector);

    const { page, MuiPagination, setPageCount } = useMuiPagination();
    useEffect(() => {
        dispatch(getBookAction(page));
    }, [page]);

    return (
        <UserLayout title="">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4 flex-wrap">
                <div className="flex">
                    {lists &&
                        lists.data.map((r, i) => (
                            <div
                                className="w-full h-full flex space-x-2 space-y-2"
                                key={i}
                            >
                                <img
                                    src={r.img}
                                    alt={r.title}
                                    className=" bg-gray-400 h-40"
                                />
                                <div className="flex flex-col justify-between">
                                    <div className="text-xl">{r.title}</div>
                                    <div className="flex justify-end px-4">
                                        <Link
                                            to={`/book/request/${r.book_id}`}
                                            className="rounded py-1 px-2 bg-blue-200"
                                        >
                                            Request This Book
                                        </Link>{" "}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="flex mt-4 justify-end ">
                    <MuiPagination />
                </div>
            </div>
        </UserLayout>
    );
};
export default UserHome;
