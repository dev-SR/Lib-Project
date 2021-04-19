import React from "react";
import { Helmet } from "react-helmet";

const SEO: React.FC<{ title: string }> = ({ title }) => {
    const titleText = title ? `${title} • GREENLib ` : "GREENLib";
    return (
        <div>
            <Helmet>
                <title>{titleText}</title>
            </Helmet>
        </div>
    );
};

export default SEO;
