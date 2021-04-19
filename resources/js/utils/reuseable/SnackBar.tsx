import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert as MuiAlert, AlertProps } from "@material-ui/lab";
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const useSnackBar = () => {
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<Severity>("success");
    const [message, setMessage] = React.useState<string>("");

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return {
        open,
        setOpen,
        handleClose,
        severity,
        setSeverity,
        message,
        setMessage,
    };
};
type Severity = "error" | "warning" | "info" | "success";

interface Props {
    open: boolean;
    handleClose:
        | ((event: React.SyntheticEvent<Element, Event>) => void)
        | undefined;
    severity?: Severity;
    message?: string;
}

const SnackBar: React.FC<Props> = ({
    open,
    handleClose,
    severity,
    message,
}) => {
    // console.log(open);
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};
export default SnackBar;
