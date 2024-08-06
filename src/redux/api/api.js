import axios from "axios";
import { signOut } from "../actions/authActions";
import Store from "../store";
import { clearMenuData } from "../actions/menuAction";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 60000,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    // console.log("error response", err, err.response)s
    if (err?.response) {
      switch (err?.response?.status) {
        case 401:
          Store.dispatch(signOut());
          Store?.dispatch(clearMenuData());
          localStorage.clear();
          break;
          //return err?.response;
        case 403:
          return err?.response;
        case 409:
          return err?.response;
        case 400:
          return err?.response;
        case 500:
          return err?.response;
        default:
          break;
      }
    } else {
      console.log('API ERROR:', err);
    }
    throw err;
  },
);

export default API;

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_ENDPOINT,
//   timeout: 60000,
// })

// API?.interceptors?.response?.use(
//   (res) => res,
//   (err) => {
//     // console.log("error response", err, err.response)s
//     if (err?.response) {
//       switch (err?.response?.status) {
//         case 401:
//           Store.dispatch(signOut());
//           return err?.response;
//         case 403:
//           return err?.response;
//         case 409:
//           return err?.response;
//         case 400:
//           return err?.response;
//         case 500:
//           return err?.response;
//         default:
//           break;
//       }
//     } else {
//       console.log('API ERROR:', err);
//     }
//     throw err;
//   },
// );

// // API.interceptors.response.use(
// //   (res) => res,
// //   (err) => {
// //     // console.log(err, "err-API");
// //     // if (err.response.status === 401) {
// //     //   console.log('UnAuthorized Request, Initiating Logout');
// //     //   Store.dispatch(sessionTimeOut());
// //     // }
// //     console.log(err.response.status);
// //     Store.dispatch(signOut());
// //     throw err;
// //   },
// // );

// // baseURL: "https://apid.magilhub.com/magilhub-data-services",
// // API.defaults.headers.common['Authorization'] = 'Bearer token';

// export default API;
