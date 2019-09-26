import { $http } from '@/utils';
import { API } from '@/config';

export default {
  // mutate state
  GET_STATE_A (context, params) {
    return $http.get(API.MODULE_A.GET_STATE_A, params).then(res => {
      context.commit('SET_STATE_A', res.data);
      return res.data;
    });
  },

  
  GET_STATE_B (context, params) {
    return $http.get(API.MODULE_A.GET_STATE_B, params).then(res => {
      context.commit('SET_STATE_B', res.data);
      return res.data;
    });
  },

  // just data fetching
  GET_STATE_C (context, params) {
    return $http.get(API.MODULE_A.GET_STATE_C, params).then(res => {
      return res.data;
    });
  }
}