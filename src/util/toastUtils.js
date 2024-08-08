import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './toastUtils.css';


// Configure Toast
toast.configure();
const ToastTimeout = 1500;

// Wrapper functions for different types of notifications
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: ToastTimeout,
        className: 'custom-toast-container', // Apply the custom class to the toast container
        progressClassName: 'Toastify__progress-bar--success', //
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: ToastTimeout,
    });
};

export const showInfoToast = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: ToastTimeout,
    });
};

export const showWarningToast = (message) => {
    toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: ToastTimeout,
    });
};
