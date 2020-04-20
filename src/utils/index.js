import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import intersection from 'lodash/intersection';

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
}

/**
 * underscore 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
export function debounce(func) {
  let timeout, args, context, timestamp, result;

  const later = () => {
    // 现在和上一次时间戳比较
    const last = +new Date() - timestamp;
    // 如果当前间隔时间少于设定时间且大于0就重新设置定时器
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      // 否则的话就是时间到了执行回调函数
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return () => {
    args = arguments;
    // 获得时间戳
    timestamp = +new Date();
    // 如果定时器不存在且立即执行函数
    const callNow = immediate && !timeout;
    // 如果定时器不存在就创建一个
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      // 如果需要立即执行函数的话 通过 apply 执行
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * 是否是外部链接
 * @param  {string} path
 * @return {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 通过meta.permissions判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
export function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    const ret[] = intersection(permissions, route.meta.permissions);
    return ret.length > 0;
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouter(routes, permissions) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, permissions);
      }
      res.push(tmp);
    }
  });
  return res;
}

/**
 * 转换参数格式
 * @param data 参数
 */
export function transformRequest(data) {
  let ret = '';
  for (const it in data) {
    if (data.hasOwnProperty(it)) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
  }
  return ret;
}

/**
 * 将时间序列化为后端需要的格式
 * @param {null | [string, string]} time 参数
 * @return {[string, string]} 序列化后时间
 * @eg
 * serializeTime(null) => ['', '']
 * serializeTime([]) => ['', '']
 * serializeTime(undefined) => ['', '']
 * serializeTime(['2018-1-1', '2018-12-31']) => ['2018-1-1', '2018-12-31']
 */
export function serializeTime(time) {
  if (time === null || isEmpty(time)) {
    return ['', ''];
  } else {
    return time;
  }
}

/**
 * 将后台返回的枚举转化为组件Select Option v-for所需要的形式
 * @param object obj 参数
 * @return [{key, label}] | [] 结果数组
 * @eg
 * transformObjectToOptionArray(null) => []
 * transformObjectToOptionArray([1, 2, 3]) => []
 * transformObjectToOptionArray({}) => []
 * transformObjectToOptionArray({a: 1}) => [{key: 1, label: 'a'}]
 */

export function transformObjectToOptionArray(obj) {
  if (!isPlainObject(obj)) {
    console.warn(
      'function transformObjectToOptionArray only accept plain object',
    );
    return [];
  }
  return Object.keys(obj).map((key) => {
    return { key, label: obj[key] };
  });
}
