import axios from "axios";

// CREATE INSTANCE FOR HOLE APPLICATION BASEURL
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default instance;
