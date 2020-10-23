import axios from "axios";
//import { signOut } from "../actions/authActions";
//import Store from "../store";


const API = axios.create({
  baseURL: "https://api.magilhub.com/magilhub-data-services",
});

// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     // console.log(err, "err-API");
//     // if (err.response.status === 401) {
//     //   console.log('UnAuthorized Request, Initiating Logout');
//     //   Store.dispatch(sessionTimeOut());
//     // }
//     console.log(err.response.status);
//     Store.dispatch(signOut());
//     throw err;
//   },
// );

// baseURL: "https://apid.magilhub.com/magilhub-data-services",
// API.defaults.headers.common['Authorization'] = 'Bearer token';

export default API;
