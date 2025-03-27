import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './toastUtils.css';


// Configure Toast
toast.configure();
const ToastTimeout = 1500;
let errorToastCount = 0
let timer = null

// Wrapper functions for different types of notifications  debounced to show 1 toast per sec
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: ToastTimeout,
        className: 'custom-toast-container', // Apply the custom class to the toast container
        progressClassName: 'Toastify__progress-bar--success', //
    });
}

export const showErrorToast = (message) => {
    clearTimeout(timer)
    if (errorToastCount === 0) {
        toast.error(message, {
            limit: 1,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: ToastTimeout,
        });
        errorToastCount++
    };
    timer = setTimeout(() => {
        errorToastCount = 0
    }, 1000)

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
