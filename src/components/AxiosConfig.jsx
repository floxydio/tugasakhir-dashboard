import axios from "axios";

const axiosNew = axios.create({
  baseURL: "http://192.168.47.110:4200/v2",
  timeoutErrorMessage:"Timeout",
  
});

export default axiosNew;
