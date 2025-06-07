import axios from "axios";

const api = axios.create({
    baseURL: "/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

export default api;
