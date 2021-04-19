import axios from "axios";
const token = localStorage.getItem("GreenLibToken");
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";

export default axios;

// export default axios.create({
//     baseURL: "http://127.0.0.1:8000/api",
//     headers: {
//         common: { Authorization: `Bearer ${token}` },
//     },
// });
