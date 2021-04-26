import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminLayout from "../../components/Shared/AdminLayout";
import Api from "../../redux/axios_config";
interface Info {
    department: number;
    users: number;
    books: number;
    subjects: number;
    issue_books: number;
}
const Dashboard = () => {
    const [info, setInfo] = useState<Info | null>(null);
    useEffect(() => {
        const FetchData = async () => {
            const { data } = await Api.get("/admin/dashboard");
            let d = data as Info;
            setInfo(d);
            console.log(d);
        };
        FetchData();
    }, []);

    return (
        <AdminLayout title="DashBoard">
            <div className="flex flex-col bg-white h-full p-4">
                {info && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className=" shadow rounded p-4 flex flex-col justify-center items-center text-2xl">
                            <div>Books Count</div>
                            <div className="text-4xl rounded-full bg-teal-100 w-20 h-20 flex justify-center items-center">
                                {info.department}
                            </div>
                        </div>
                        <div className="shadow rounded p-4 flex flex-col justify-center items-center text-2xl">
                            <div>Course Count</div>
                            <div className="text-4xl rounded-full bg-teal-100 w-20 h-20 flex justify-center items-center">
                                {info.subjects}
                            </div>
                        </div>
                        <div className="shadow rounded p-4 flex flex-col justify-center items-center text-2xl">
                            <div>Book Issued</div>
                            <div className="text-4xl rounded-full bg-teal-100 w-20 h-20 flex justify-center items-center">
                                {info.issue_books}
                            </div>
                        </div>
                        <div className="col-span-2 shadow rounded p-4 flex flex-col justify-center items-center text-2xl">
                            <div>User Count</div>
                            <div className="text-4xl rounded-full bg-teal-100 w-20 h-20 flex justify-center items-center">
                                {info.users}
                            </div>
                        </div>
                        <div className="shadow rounded p-4 flex flex-col justify-center items-center text-2xl">
                            <div>Book Count</div>
                            <div className="text-4xl rounded-full bg-teal-100 w-20 h-20 flex justify-center items-center">
                                {info.books}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
