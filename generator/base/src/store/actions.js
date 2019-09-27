import { API } from '@/config';
export default {
  // mutate state
  GET_PUBLIC_1 (context, params) {
    return $http.get(API.PUBLIC.GET_PUBLIC_1, params).then(res => {
      context.commit('SET_PUBLIC_1', res.data);
      return res.data;
    });
  },
  GET_PUBLIC_2 (context, params) {
    return $http.get(API.PUBLIC.GET_PUBLIC_2, params).then(res => {
      context.commit('SET_PUBLIC_2', res.data);
      return res.data;
    });
  },

  // just data fetching
  GET_PUBLIC_3 (context, params) {
    return Promise.resolve({ data: 'resData' }).then(res => {
      return res.data;
    });
  }
};