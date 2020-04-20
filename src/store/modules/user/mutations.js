// import { state } from './types';

export const mutations = {
  LIST_START: state => {
    state.loading = true;
  },
  LIST_COMPLETED: (state, data) => {
    state.loading = false;
    state.menus = data;
  },
};
