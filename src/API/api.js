import {ToastAndroid} from 'react-native';

// basic url
const basicUrl = 'http://192.168.1.101/apex/hs/deskrmk3/';
const headers = new Headers();
export default (path, method, token, data) => {
  // const headers = {
  //   Authorization: 'Basic ' + token,
  // };

  headers.set('Authorization', `Basic ${token}`);

  return new Promise((resolve, reject) => {
    RESTAPI(path, method, headers, data)
      .then((res) => {
        if (res.status === 200) resolve(res.json());
        else if (res.status === 401) {
          ToastAndroid.show(
            'вы неправильно ввели имя или пароль ',
            ToastAndroid.SHORT,
          );
          reject('status code: ' + res.status);
        } else {
          ToastAndroid.show('status code: ' + res.status, ToastAndroid.SHORT);
          reject('status code: ' + res.status);
        }
      })
      .catch((e) => {
        ToastAndroid.show('Network Error', ToastAndroid.SHORT);
        console.log(data, 'data');
        reject(e);
      });
  });
};
const RESTAPI = (path, method, headers, data) => {
  switch (method) {
    case 'GET':
      return fetch(
        `${path === '1/getoptions' ? basicUrl.slice(0, -2) : basicUrl}${path}`,
        {method: method, headers: headers},
      );
    case 'POST':
      return fetch(`${basicUrl}${path}`, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      });
    default:
      return fetch(`${basicUrl}${path}`, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      });
  }
};
