import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'https://aqueous-dawn-29192.herokuapp.com/api',
  timeout: 10000,
});

export const setClientToken = token => {
  // console.log('set set set 🤕🤕🤕');
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTA1Y2VhNmQ5YzdhMDcyMDkxZThkYiIsInVzZXJuYW1lIjoidGVzdERyaXZlciIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2MjU3MjY0MzcsImV4cCI6MTYyNTczMDAzN30.-qwUeF4BFcfEVcRTFi1OwIeTdQxiW6O7KU7CJqGd8tk';
    return config;
  });
};

export default APIKit;
