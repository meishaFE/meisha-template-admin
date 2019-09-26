import Vue from 'vue';
import Vuex from 'vuex';

// global 
import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

// module
import moduleA from './module';


Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,  
  module: {
    moduleA
  },
  strict: process.env.NODE_ENV !== 'production'
});
