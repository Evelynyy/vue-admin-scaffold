import API from '@/api';

export const actions = {
  async GetSysMenu({ commit }) {
    commit('LIST_START');
    const response = await API.sysMenu();
    // eslint-disable-next-line no-console
    console.log(response);
    commit('LIST_COMPLETED', response);
  },
};
