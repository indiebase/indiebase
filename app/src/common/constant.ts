export const getJaccountAuthCode = (uri) =>
  `https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${uri}`;
