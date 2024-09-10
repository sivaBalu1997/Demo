import Store from "../store";
import { API } from "redux/api";

export function makePayment(data) {
  return API({
    method: "post",
    url: "/razorPay/account",
    data: data,
  });
}
