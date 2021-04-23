import React from "react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-teal-100 py-6 flex flex-col justify-center items-center sm:py-12">
            <div className="loader bg-white p-5 rounded-full flex space-x-3">
                <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}
