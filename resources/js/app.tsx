import React, { FC } from "react";
import { render } from "react-dom";
import App from "./Root";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

render(
    <Provider store={store}>
        <SnackbarProvider
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            action={(key) => console.log(key)}
        >
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById("app")
);
