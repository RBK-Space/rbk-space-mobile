import axios from "axios";
const headers = {
  "Content-Type": "multipart/form-data"
  // 'Authorization': 'Bearer ' + myAuthToken // if using JWT
};
export default CallAPI = (requireConfig = {}, onSuccess, onError) => {
  console.log(requireConfig.data);
  const config = {
    ...requireConfig,
    url: encodeURI(requireConfig.url),
    method: requireConfig.method,
    timeout: 5000,
    data: requireConfig.data
  };
  const request = axios(config)
    .then(response => onSuccess(response))
    .catch(error => onError(error));
  return request;
};
