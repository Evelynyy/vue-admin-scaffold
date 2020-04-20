import API from './api';

export const actions = {
  async List({ commit }, params) {
    commit('LIST_START', params);
    const response = await API.functionName1(params);
    commit('LIST_COMPLETED', response);
  },
  // eslint-disable-next-line no-empty-pattern
  async Create({}, data) {
    try {
      await API.functionName2(data);
      return true;
    } catch (err) {
      return false;
    }
  },
};
