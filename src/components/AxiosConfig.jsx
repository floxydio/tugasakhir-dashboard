import axios from "axios";

const axiosNew = axios.create({
  baseURL: "http://localhost:3000/v2",
});

export default axiosNew;
