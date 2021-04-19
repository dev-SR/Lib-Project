import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminLayout from "../../../components/Shared/AdminLayout";
import {
    useTypedSelector,
    getCategoryAction,
    getCategorySelector,
} from "../../../redux/store";

export default function ListCategories() {
    const { lists, status } = useTypedSelector(getCategorySelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryAction(""));
    }, [lists, dispatch]);

    return (
        <AdminLayout title="Category">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">
                    List Of Categories
                </div>

                <div className="flex justify-center items-center h-full">
                    {lists &&
                        lists.map((l) => (
                            <div>
                                <p>{l.category_name}</p>
                                <p>{l.id}</p>
                            </div>
                        ))}
                </div>
            </div>
        </AdminLayout>
    );
}
