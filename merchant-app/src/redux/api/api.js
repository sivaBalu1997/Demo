import axios from "axios";

const API = axios.create({
  baseURL: "https://apiq.magilhub.com/magilhub-data-services",
});

// baseURL: "https://apid.magilhub.com/magilhub-data-services",
// API.defaults.headers.common['Authorization'] = 'Bearer token';

export default API;
