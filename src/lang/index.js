import Vue from 'vue';
import VueI18n from 'vue-i18n';
import pageName from '@/views/page-name/locales';

Vue.use(VueI18n);

function mergeOne(target, obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof acc[key] === 'object' && typeof value === 'object') {
      mergeOne(acc[key], value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, target);
}

function merge(target, ...objs) {
  return objs.reduce((acc, obj) => {
    mergeOne(acc, obj);
    return acc;
  }, target);
}

const messages = merge(pageName);

export default new VueI18n({
  locale: 'zh-CN', // 设置地区，第一期默认中文
  // locale: process.env.VUE_APP_DEFAULT_LOCALE, // 设置地区
  messages, // 设置地区信息
});
