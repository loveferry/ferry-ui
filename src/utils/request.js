/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
const baseUrl = 'http://localhost:8888';

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    new Promise(function(resolve, reject){
      resolve(response.clone().json());
    }).then(function(responseData){
      if(responseData.code === 401){
        notification.error({
          message: `认证失败`,
          description: responseData.message ? responseData.message : '请重新登录',
        });
        sessionStorage.clear();
        router.push('/user/login');
      }else if(responseData.code === 403){
        notification.error({
          message: `权限不足`,
          description: responseData.message ? responseData.message : '访问资源受限',
        });
      }
      return error;
    });
  } else if (!response) {
    notification.error({
      message: `网络异常`,
      description: '您的网络发生异常，无法连接服务器',
    });
    return error;
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    credentials: 'include',
  },
});

/**
 * 请求拦截器
 */
request.interceptors.request.use((url, options) => {
  let o = {
    ...options,
  };
  if(!url.startsWith('/api/login')){
    o.headers['Authorization'] = sessionStorage.getItem('access_token') == null ? null : `Bearer ${sessionStorage.getItem('access_token')}`;
    if(o.method === 'post'){
      o.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
  }
  return (
    {
      url: options.mock ? url : `${baseUrl}${url}`,
      options: o,
    }
  );
});

/**
 * 响应拦截器
 */
request.interceptors.response.use((response) => {
  return response;
});


export default request;
