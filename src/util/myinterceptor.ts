import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    console.error(error)
  }
  return error;
});

axiosInstance.interceptors.request.use(config => {
  let jwtToken = localStorage.getItem('access')
  if (jwtToken) {
    config.headers['Authorization'] = `JWT ${jwtToken}`
  }
  return config
});

export default axiosInstance