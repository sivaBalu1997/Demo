import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Configure Toast
toast.configure();

// Wrapper functions for different types of notifications
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};

export const showInfoToast = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};

export const showWarningToast = (message) => {
    toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    });
};
