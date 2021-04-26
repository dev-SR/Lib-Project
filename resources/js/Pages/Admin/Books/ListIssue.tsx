import { Link } from "react-router-dom";
import React, { FC } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons/svg";
import { useDispatch } from "react-redux";
import { deleteIssuedBookAction, IssuedBook } from "../../../redux/books";
type Subject = {
    subject: string;
    id: number;
    department: {
        department: string;
    } | null;
};
interface Issue extends IssuedBook {}

type Props = {
    lists: Issue[];
};

const ListSubject: FC<Props> = ({ lists }) => {
    const dispatch = useDispatch();
    const handleDelete = (id: number) => {
        dispatch(deleteIssuedBookAction(id));
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
                                                    User
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Book
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
                                                <tr key={i}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {r.user.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-1 items-center">
                                                        <img
                                                            className="w-16 h-16 object-contain"
                                                            src={r.book.img}
                                                            alt={r.book.title}
                                                        />
                                                        <div>
                                                            {r.book.title}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            {/* <Link
                                                                to={`/subjects/${r.id}`}
                                                            >
                                                                <EditIcon />
                                                            </Link> */}

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

export default ListSubject;
