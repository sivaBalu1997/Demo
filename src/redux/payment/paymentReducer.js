import { produce } from "immer";
import {
  MAKE_PAYMENT_FAILED,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_REQUEST,
} from "../payment/paymentConstant";

const paymentState = {
  makePaymentLoading: false,
  makePaymentSuccess: false,
  paymentSuccessData: {},
  paymentFailedMessage: "",
  makePaymentFailed: false,
};

export default function employeeReducer(state = paymentState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      // Get Menu Reducers
      case MAKE_PAYMENT_REQUEST:
        draft.makePaymentLoading = true;
        draft.makePaymentSuccess = false;
        draft.paymentFailedMessage = "";
        break;
      case MAKE_PAYMENT_SUCCESS:
        draft.makePaymentLoading = false;
        draft.makePaymentSuccess = true;
        draft.paymentSuccessData = action.payload;
        draft.paymentFailedMessage = "";

        break;
      case MAKE_PAYMENT_FAILED:
        draft.makePaymentLoading = false;
        draft.makePaymentSuccess = false;
        draft.makePaymentFailed = true;
        draft.paymentFailedMessage = action.payload;
        break;
      default:
        break;
    }
  });
}
