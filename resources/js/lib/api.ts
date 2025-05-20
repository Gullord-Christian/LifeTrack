import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Laravel handles routing
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
});

export default api;
