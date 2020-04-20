import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user/store';
import pageName from '@/views/page-name/vuex/store';

Vue.use(Vuex);

const store = {
  state: {
    version: '1.0.0',
  },
  modules: {
    user,
    pageName,
  },
};

export default new Vuex.Store(store);
