import axios from "axios";

// axios.defaults.withCredentials = true;
const instance = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL, withCredentials: true })

export default instance;
