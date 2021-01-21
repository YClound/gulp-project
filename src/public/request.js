const Axios = require('axios');
const serverUrl = 'http://localhost:9999';

const instance = Axios.create({
  baseURL: serverUrl,
  timeout: 1000,
})

instance.interceptors.response.use(function (response) {
  const { config, data } = response;
  const { success, code, data: respData } = data;
  console.log('instance.interceptors.response:', response)
  if (config.responseType == 'blob') {
    return data;
  }

  if (success && code === 0) {
    return respData;
  }

  return Promise.reject(data);
}, function (error) {
  return Promise.reject(error);
})

export const request = (options) => {
  let { url, method = "GET", headers = { "Content-Type": "application/x-www-form-urlencoded" }, data, ...config } = options;
  let params = { params: data }
  if (!url) { throw new Error('request url not empty') }
  if (!method) { throw new Error('request method not empty') }

  if (headers["Content-Type"] === 'application/json') {
    params = { data: JSON.stringify(data) };
  }

  return instance.request({
    url: `/api${url}`,
    method,
    headers,
    ...params,
    ...config
  }).then((data = {}) => {
    // const respData = res.data || {};
    // if (respData.code === 0) {
    //   return respData.data;
    // }
    return data;
  })
}

/**
 * 
 * @param {*} options 
 * @link https://www.cnblogs.com/cluyun/p/13773536.html
 */
export const exportExcelRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options).then(res => {
      return resolve(res);
    })
  })
}