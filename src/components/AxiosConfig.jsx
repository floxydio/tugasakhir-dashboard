import axios from "axios";

const axiosNew = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL_INISS + import.meta.env.VITE_BASEURL_VERSION}`,
  timeoutErrorMessage:"Timeout",
  timeout: 10000,

});

export default axiosNew;
