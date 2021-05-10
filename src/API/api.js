import {Alert, ToastAndroid} from 'react-native';

// basic url
const basicUrl = 'https://apex.lavina.uz/apex/hs/deskrmk3/';
const headers = new Headers();
export default (path, method, token, data) => {
  // const headers = {
  //   Authorization: 'Basic ' + token,
  // };

  headers.set('Authorization', `Basic ${token}`);

  return new Promise((resolve, reject) => {
    RESTAPI(path, method, headers, data)
      .then(async (res) => {
        if (res.status === 200) {
          resolve(
            path === 'desk/synchstockwarehouse' ? res.text() : res.json(),
          );
        } else if (res.status === 401) {
          ToastAndroid.show(
            'вы неправильно ввели имя или пароль ',
            ToastAndroid.SHORT,
          );

          reject('status code: ' + res.status);
        } else {
          ToastAndroid.show('status code: ' + res.status, ToastAndroid.SHORT);
          const text = await res.text();
          Alert.alert('error!!!', text);
          reject(res.status);
        }
      })
      .catch((e) => {
        ToastAndroid.show('Network Error', ToastAndroid.SHORT);
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
      return fetch(
        `${
          path === 'desk/synchstockwarehouse' ? basicUrl.slice(0, -9) : basicUrl
        }${path}`,
        {
          method: method,
          body: JSON.stringify(data),
          headers: headers,
        },
      );
    default:
      return fetch(`${basicUrl}${path}`, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      });
  }
};
