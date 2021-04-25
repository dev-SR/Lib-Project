import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

export const useMuiPagination = () => {
    /**
     *    offset = (page-1)*limit
     */
    // page ~ (offset/limit)+1
    // postsPerPage ~ limit
    let [pageCount, setPageCount] = useState<number>(2);

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const MuiPagination = () => (
        <Pagination
            count={pageCount}
            page={page}
            shape="rounded"
            onChange={handleChange}
        />
    );

    return {
        setPageCount,
        MuiPagination,
        page,
    };
};
