// import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { state } from './types';
// import { RootState } from '@/store/modules/types';

const namespaced = true;

const user = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
export default user;
