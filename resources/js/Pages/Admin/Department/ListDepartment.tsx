import { Link } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons/svg";
import { useDispatch } from "react-redux";
import { deleteDepartmentAction } from "../../../redux/store";
type Department = {
    department: string;
    id: number;
};
type ListPrpps = {
    lists: Department[];
};

const ListDepartment: FC<ListPrpps> = ({ lists }) => {
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteDepartmentAction(id));
    };
    return (
        <div className="flex justify-center items-center h-full">
            {lists && (
                <div className="w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Cateory Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="relative px-6 py-3"
                                                >
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className="bg-white divide-y divide-gray-200"
                                            x-max="1"
                                        >
                                            {lists.map((r, i) => (
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {r.department}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <Link
                                                                to={`/edit-category/${r.id}`}
                                                            >
                                                                <EditIcon />
                                                            </Link>

                                                            <button
                                                                className="focus:outline-none"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        r.id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListDepartment;
