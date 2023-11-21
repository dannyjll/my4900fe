import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    console.error(error)
    window.location.assign('/auth')
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

axiosInstance.interceptors.request.use(config => {
  let jwtToken = localStorage.getItem('access')
  if (jwtToken) {
    config.headers['Authorization'] = `JWT ${jwtToken}`
  }
  return config
});

export default axiosInstance