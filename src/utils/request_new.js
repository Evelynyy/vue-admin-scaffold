import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';

const SUCCESS = 'success';

const token = '3CNivv9ub4DIIKIQeuIqTdyDUIZSAQPF+i1PZJZ74ac=';

const checkStatus = (response) => {
  const { status, message } = response;
  if ((status >= 200 && status < 300) || status === 304) {
    const { data } = response;
    return data;
  } else {
    let errorInfo = message;
    switch (status) {
      case 404:
        errorInfo = '资源不存在';
        break;
      case 500:
        errorInfo = '访问服务失败';
        break;
      case 502:
        errorInfo = '无效网关';
        break;
      case 503:
        errorInfo = '服务不可用';
        break;
      default:
        errorInfo = '连接错误';
    }
    return { [SUCCESS]: false, status, message: errorInfo };
  }
};

// init instance
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { token, clientPlatform: 2 },
});

// interceptors of request
instance.interceptors.request.use(
  function (config) {
    config.headers = Object.assign(
      config.method === 'get'
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          }
        : {
            'Content-Type': 'application/json; charset=UTF-8',
          },
      config.headers,
    );

    if (config.method === 'post') {
      const contentType = config.headers['Content-Type'];
      //  transform data via Content-Type
      if (contentType) {
        if (contentType.includes('multipart')) {
          // multipart/form-data
        } else if (contentType.includes('json')) {
          // application/json
          config.data = JSON.stringify(config.data);
        } else {
          // application/x-www-form-urlencoded
          config.data = Qs.stringify(config.data);
        }
      }
    }
    return Promise.resolve(config);
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return Promise.resolve(checkStatus(response));
  },
  function (error) {
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    }
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1
    ) {
      return Promise.reject({ [SUCCESS]: false, message: '连接超时' });
    }
    return Promise.reject({ [SUCCESS]: false, message: '连接错误' });
  },
);

export const request = async function (opt) {
  const options = {
    method: 'get',
    errorHandler: (response) => Toast(response.message),
    ...opt,
  };
  const { errorHandler } = options;
  try {
    const res = await instance(options);
    if (!res.success) {
      errorHandler(res);
    }
    return res;
  } catch (err) {
    errorHandler(err);
    return err;
  }
};
