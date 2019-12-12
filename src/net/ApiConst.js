export const BASE_URL = "http://192.168.68.141:4000/";
// export const LOGIN_URL = `${BASE_URL}bins/zyjea`;

const POSTS_URL = `${BASE_URL}posts`;
const POST_Add = `${BASE_URL}user/post/add`;
const USERS_URL = `${BASE_URL}users`;
const USER_ID = `${BASE_URL}user/`;
const USER_NAME_URL = `${BASE_URL}user/name/`;
const CLIENT_HOME_PAGE_URL = `http://192.168.68.141:3000/`;
const CLIENT_AUTH_SUCCESS_URL = `${BASE_URL}auth/login/success`;
const AUTH_GIHUB = `${BASE_URL}auth/github`;

export default URLS = {
  POSTS_URL,
  POST_Add,
  USERS_URL,
  USER_ID,
  USER_NAME_URL,
  CLIENT_HOME_PAGE_URL,
  CLIENT_AUTH_SUCCESS_URL,
  AUTH_GIHUB
};
