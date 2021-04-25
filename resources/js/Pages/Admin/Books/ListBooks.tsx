import { Link } from "react-router-dom";
import React, { FC, useEffect } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons/svg";
import { useDispatch } from "react-redux";
import { deleteDepartmentAction } from "../../../redux/store";
import { Department } from "../../../types/typeDef";
import AdminLayout from "../../../components/Shared/AdminLayout";
import { useMuiPagination } from "../../../components/reuseable/Pagination";

interface HeaderListProps {
    headLists: string[];
}
const Header: FC<HeaderListProps> = ({ headLists }) => {
    return (
        <>
            {headLists.map((h, i) => (
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={i}
                >
                    {h}
                </th>
            ))}
        </>
    );
};

type Books = {
    book_id: number;
    title: string;
};

interface RowListProps {
    rowLists: Books[];
}
const Rows: FC<RowListProps> = ({ rowLists }) => {
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteDepartmentAction(id));
    };
    return (
        <>
            {rowLists.map((r, i) => (
                <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {r.book_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {r.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                            <Link to={`/books/${r.book_id}`}>
                                <EditIcon />
                            </Link>
                            <button
                                className="focus:outline-none"
                                onClick={() => handleDelete(r.book_id)}
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

const ListBooks = () => {
    const lists = [{ department: "", id: 0 }];
    const { page, MuiPagination } = useMuiPagination(5);
    useEffect(() => {
        console.log(page);
    }, [page]);
    return (
        <AdminLayout title="Update Subject">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto mainscroll p-4">
                <div className="text-md font-thin text-gray-700">
                    Books List
                </div>
                <div className="flex items-center h-full flex-col">
                    {lists && (
                        <div className="w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <Header
                                                            headLists={[
                                                                "title",
                                                                "author",
                                                            ]}
                                                        />
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
                                                    <Rows
                                                        rowLists={[
                                                            {
                                                                book_id: 1,
                                                                title:
                                                                    "How to code",
                                                            },
                                                            {
                                                                book_id: 1,
                                                                title:
                                                                    "How to code",
                                                            },
                                                        ]}
                                                    />
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <MuiPagination />
                </div>
            </div>
        </AdminLayout>
    );
};

export default ListBooks;
