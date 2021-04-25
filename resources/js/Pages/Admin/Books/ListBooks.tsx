import { Link } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons/svg";
import { useDispatch } from "react-redux";
import {
    deleteDepartmentAction,
    getBookAction,
    getBookSelector,
    useTypedSelector,
} from "../../../redux/store";
import { Department } from "../../../types/typeDef";
import AdminLayout from "../../../components/Shared/AdminLayout";
import { useMuiPagination } from "../../../components/reuseable/Pagination";
import { deleteBookAction, FetchBooks } from "../../../redux/books";

const Header = () => {
    const headLists = [
        "book_id",
        "title",
        "img",
        "authors",
        "copies",
        "course",
        "department",
        "edition",
        "pages",
        "price",
        "self no",
        "publisher",
        "isbn",
    ];
    return (
        <>
            {headLists.map((h, i) => (
                <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={i}
                >
                    {h}
                </th>
            ))}
        </>
    );
};

interface RowListProps {
    rowLists: FetchBooks[];
}
const Rows: FC<RowListProps> = ({ rowLists }) => {
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteBookAction(id));
    };
    return (
        <>
            {rowLists.map((r, i) => (
                <tr key={i}>
                    <td className="px-4 py-4 w-40 text-sm text-gray-500">
                        {r.book_id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap  text-sm text-gray-500  w-40 overflow-x-hidden">
                        {r.title}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                        <img
                            src={r.img}
                            alt={r.title}
                            className="w-16 h-16 object-contain"
                        />
                    </td>
                    <td className="px-4 py-4 w-40 whitespace-nowrap text-sm text-gray-500">
                        {r.authors}
                    </td>
                    <td
                        className={`px-4 py-4 w-40  text-sm ${
                            r.copies <= 5 ? "text-red-500" : "text-gray-500"
                        }`}
                    >
                        {r.copies}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap  text-sm text-gray-500">
                        {r.subject && r.subject.subject}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {r.department && r.department.department}
                    </td>
                    <td className="px-4 py-4 w-20  text-sm text-gray-500">
                        {r.edition}
                    </td>
                    <td className="px-4 py-4 w-20  text-sm text-gray-500">
                        {r.pages}
                    </td>
                    <td className="px-4 py-4 w-20  text-sm text-gray-500">
                        ${r.price}
                    </td>
                    <td className="px-4 py-4 w-20 text-sm text-gray-500">
                        {r.shelf_no}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {r.isbn}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                            <Link to={`/books/${r.book_id}`}>
                                <EditIcon />
                            </Link>
                            <button
                                className="focus:outline-none"
                                onClick={() => handleDelete(r.id)}
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
    // const [lists,UpdateList] = useState();

    const { lists } = useTypedSelector(getBookSelector);
    const { page, MuiPagination, setPageCount } = useMuiPagination();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBookAction(page));
    }, [page]);
    useEffect(() => {
        if (!lists) dispatch(getBookAction(page));

        if (lists) {
            let total = lists.total;
            let count = total / 4;
            setPageCount(count);
        }
    }, [lists]);

    return (
        <AdminLayout title="Update Subject">
            <div className="flex flex-col bg-white h-full shadow-md overflow-y-auto  p-4 overflow-x-hidden">
                <div className="text-md font-thin text-gray-700">
                    Books List
                </div>
                {lists && (
                    <div className="overflow-auto mainscroll flex flex-col shadow border-b border-gray-200 pb-4 mt-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <Header />
                                    <th
                                        scope="col"
                                        className="relative px-4 py-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white divide-y divide-gray-200"
                                x-max="1"
                            >
                                <Rows rowLists={lists.data} />
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex mr-10 justify-end ">
                    <MuiPagination />
                </div>
            </div>
        </AdminLayout>
    );
};

export default ListBooks;
