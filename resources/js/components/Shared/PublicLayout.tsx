import React from "react";
import SEO from "./SEO";
import DesktopSideBar from "../Navigation/DesktopSideBar";
import Navigation from "../Navigation/Navigation";
type LayoutProps = {
    title: string;
};
const UserLayout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <div className="bg-teal-100">
            <SEO title={title} />
            <div className="h-screen flex sm:flex-row flex-col-reverse overflow-y-hidden blur">
                <div className="sm:w-full sm:h-full h-full overflow-y-hidden flex flex-col ">
                    <Navigation />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
