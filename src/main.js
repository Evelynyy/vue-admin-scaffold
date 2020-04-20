import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import router from '@/router';
import store from './store';
import i18n from '@/lang';
import App from './App.vue';
import * as filters from '@/filters/index';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/common.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small', locale });

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
