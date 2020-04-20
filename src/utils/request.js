import axios from 'axios';
import store from '@/store';
// import Cookies from 'js-cookie';
// import { COOKIES_CONSTANTS } from '@/constants';
import { Message } from 'element-ui';
// import router from '@/router';
// import { IDS_API } from '@/api';

const service = axios.create({
  timeout: 30000,
  // baseURL: '/xxx', // 视情况而定
});

axios.interceptors.request.use(
  (config) => {
    const token = store.state.account.token;
    // || Cookies.get(COOKIES_CONSTANTS.TOKEN);
    config.headers = {
      ...config.headers,
      Authorization: token,
      appCode: process.env.VUE_APP_APP_CODE,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response = {} } = error;
    const { status, data = {} } = response;
    const { msg } = data;
    Message.error(
      {
        400: {
          message: 'Please log in again.',
          // onClose: () => IDS_API.logout(router.history.current.fullPath), // 指定登出的path，重新登录后可以回到path
        },
        401: "You don't have permission",
        404: 'Not Found',
        405: 'Something is error',
        500: 'Server error',
      }[status] ||
        msg ||
        'Maybe hava some problems',
    );
    return response ? Promise.reject(data) : Promise.reject(error);
  },
);

export default service;
