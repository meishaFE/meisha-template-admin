import { $http } from '@/utils';
import { API } from '@/config';
export const logout = ({commit, state}) => {
  console.log('logout success');
};

export const login = ({ commit }, data) => {
  console.log('login data =>');
  console.log(data);
  return $http.post(API.LOGIN, data).then(res => {

  });
};
