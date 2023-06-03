import axios from "axios";

const axiosNew = axios.create({
  baseURL: "http://103.174.115.58:3000/v1",
});

export default axiosNew;
