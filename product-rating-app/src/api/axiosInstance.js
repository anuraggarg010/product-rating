import axios from 'axios'
const axiosInstance = axios.create({
  baseURL : 'http://localhost:5000/api/', // always send this thorugh .env
})

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log("wewe")
     if (res.status === 201) {
        console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
     return Promise.reject(err);
  }
);

  export default axiosInstance;