import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { getCartBookAction } from "../../redux/cart";
import { getCartBookSelector, useTypedSelector } from "../../redux/store";

const CartPage = () => {
    const l = useLocation();
    const book_id = l.search ? l.search.split("=")[1] : null;
    const dispatch = useDispatch();

    const { cart } = useTypedSelector(getCartBookSelector);

    useEffect(() => {
        // check if already exits
        let found = cart.find((book) => book.book_id === Number(book_id));
        if (book_id && !found) dispatch(getCartBookAction(book_id));
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
        </div>
    );
};

export default CartPage;
