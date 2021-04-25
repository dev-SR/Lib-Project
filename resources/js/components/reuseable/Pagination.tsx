import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export const useMuiPagination = (count: number) => {
    /**
     *    offset = (page-1)*limit
     */
    // page ~ (offset/limit)+1
    // postsPerPage ~ limit
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const MuiPagination = () => (
        <Pagination
            count={count ? count : 5}
            page={page}
            shape="rounded"
            onChange={handleChange}
            color="secondary"
        />
    );

    return {
        MuiPagination,
        page,
    };
};
