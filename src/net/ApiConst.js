export const BASE_URL = "https://rbk-space01.herokuapp.com/";
// export const LOGIN_URL = `${BASE_URL}bins/zyjea`;

const POSTS_URL = `${BASE_URL}api/posts`;
const POST_Add = `${BASE_URL}api/user/post/add`;
const USERS_URL = `${BASE_URL}api/users`;
const USER_ID = `${BASE_URL}api/user/`;
const USER_NAME_URL = `${BASE_URL}api/user/name/`;
const CLIENT_HOME_PAGE_URL = `https://rbk-space01.herokuapp.com/`;
const CLIENT_AUTH_SUCCESS_URL = `${BASE_URL}auth/login/success`;
const AUTH_GIHUB = `${BASE_URL}auth/github`;
const LOGOUT_URL = `${BASE_URL}logout`;
const EDIT_BASE_DATA_URL = `${BASE_URL}api/user/edit/basic`;
const EDIT_CONTACT_URL = `${BASE_URL}api/user/edit/contact`;
const EDIT_PORTFOILO_URL = `${BASE_URL}api/user/edit/portfolio`;
const GET_SKILLS = `${BASE_URL}api/skills`;
const GET_EMP = `${BASE_URL}api/empStatus`;
const GET_COHORT = `${BASE_URL}api/cohorts`;
const POST_Image = `${BASE_URL}upload/image`;
const GET_Auth_GITHB = `${BASE_URL}auth/github/callback`;
const POST_EDIT_PROFILE = `${BASE_URL}api/user/edit/skill`;

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
