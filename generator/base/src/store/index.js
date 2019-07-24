import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  disabledMenuIndex: [],
  userInfo: null,
  auth: null
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug
});
