import axios from "axios";

export default CallAPI = (requireConfig = {}, onSuccess, onError) => {
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
