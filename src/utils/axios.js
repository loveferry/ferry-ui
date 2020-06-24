import Axios from 'axios';
import {message} from 'antd';
const axios = Axios.create();
axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials=true;

axios.interceptors.request.use(
  config => {
    if(!config.url.startsWith('/api/login')){
      config.headers[config.method].Authorization = 'Bearer ' + localStorage.getItem('access_token');
    }
    return config;
  },
  err => {
    message.error(error.message);
    return Promise.resolve(err);
  }
);
axios.interceptors.response.use(
  response => {
    if(response.status === 200){
      if(response.data.success){
        return response.data.maps;
      }else{
        message.error(response.data.message);
      }
    }else{
      message.error(response.statusText);
    }
    return false;
  },
  error => {
    message.error(error.message);
    return Promise.reject(error);
  }
);
export default axios;
