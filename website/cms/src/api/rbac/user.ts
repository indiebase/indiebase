import { req } from '../req';

interface UserLoginReq {
  code: string;
  redirect_uri: string;
  [k: string]: any;
}

export interface UserFormData {
  id?: number;

  account: string;

  username: string;

  disable: number;

  roles?: any[];

  createTime?: Date;

  updateTime?: Date;
  [k: string]: any;
}

interface QueryUserParams {
  name?: string;
  [k: string]: any;
}

export const loginWithJaccountCode = async function (params: UserLoginReq) {
  const { data } = await req.post('/v1/user/login', params, {
    withCredentials: true,
  });
  return data;
};

export const getUserProfile = async function () {
  const { data } = await req.get('/v1/user/profile');
  return data;
};

export const queryUserReq = async function (params?: QueryUserParams) {
  const { data } = await req.get('/v1/user/query', { params });
  return data;
};

export const createUserReq = async function (params: UserFormData) {
  const { data } = await req.post('/v1/user/create', params);
  return data;
};

export const updateUserReq = async function (params: UserFormData) {
  const { data } = await req.put('/v1/user/update', params);
  return data;
};

export const deleteUserReq = async function (params: any) {
  const { data } = await req.delete('/v1/user/delete', { data: params });
  return data;
};

// export const logout = function (uri: string) {
//   axios.get('http://jaccount.sjtu.edu.cn/oauth2/logout', {
//     params: {
//       client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
//       post_logout_redirect_uri: uri,
//     },
//   });
// };
