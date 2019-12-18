export const BASE_URL = "http://192.168.68.117:4000/";
// export const LOGIN_URL = `${BASE_URL}bins/zyjea`;

const POSTS_URL = `${BASE_URL}posts`;
const POST_Add = `${BASE_URL}user/post/add`;
const USERS_URL = `${BASE_URL}users`;
const USER_ID = `${BASE_URL}user/`;
const USER_NAME_URL = `${BASE_URL}user/name/`;
const CLIENT_HOME_PAGE_URL = `http://192.168.68.117:3000/`;
const CLIENT_AUTH_SUCCESS_URL = `${BASE_URL}auth/login/success`;
const AUTH_GIHUB = `${BASE_URL}auth/github`;
const LOGOUT_URL = `${BASE_URL}logout`;
const EDIT_BASE_DATA_URL = `${BASE_URL}user/edit/basic`;
const EDIT_CONTACT_URL = `${BASE_URL}user/edit/contact`;
const EDIT_PORTFOILO_URL = `${BASE_URL}user/edit/portfolio`;
const GET_SKILLS = `${BASE_URL}skills`;
const GET_EMP = `${BASE_URL}empStatus`;
const GET_COHORT = `${BASE_URL}cohorts`;
const POST_Image = `${BASE_URL}upload/image`;
const GET_Auth_GITHB = `${BASE_URL}auth/github/callback`;
const POST_EDIT_PROFILE = `${BASE_URL}user/edit/skill`;

export default URLS = {
  POSTS_URL,
  POST_Add,
  USERS_URL,
  USER_ID,
  USER_NAME_URL,
  CLIENT_HOME_PAGE_URL,
  CLIENT_AUTH_SUCCESS_URL,
  AUTH_GIHUB,
  LOGOUT_URL,
  EDIT_BASE_DATA_URL,
  EDIT_CONTACT_URL,
  EDIT_PORTFOILO_URL,
  GET_COHORT,
  GET_EMP,
  GET_SKILLS,
  POST_Image,
  GET_Auth_GITHB,
  POST_EDIT_PROFILE
};
