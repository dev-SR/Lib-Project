import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// axios.defaults.headers.post["Accept"] = "application/json";
// axios.defaults.headers.get["Accept"] = "application/json";
const local = "http://127.0.0.1:8000/api";
const build = "https://greenlib.herokuapp.com/api";
const instance = axios.create({
    baseURL: local,
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("GreenLibToken");
        // console.log(token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;

// export default axios.create({
//     baseURL: "http://127.0.0.1:8000/api",
//     headers: {
//         common: { Authorization: `Bearer ${token}` },
//     },
// });
