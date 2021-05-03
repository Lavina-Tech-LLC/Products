import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GlobalStyles from '../styles/GlobalStyles';
import base64 from 'react-native-base64';
import {getOption, setTokenAC} from '../Redux/UserReducer';

export default () => {
  const state = useSelector((s) => s.mainState);
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const size = state.size;
  const gStyle = GlobalStyles(size);
  const style = styles(size);

  const Submit = () => {
    const token = base64.encode(login + ':' + password);
    dispatch(setTokenAC(token));
    dispatch(getOption(token));
  };
  return (
    <View style={[gStyle.shadow, style.container]}>
      <Text style={style.header}>Введите логин и пароль </Text>
      <View style={style.content}>
        <TextInput
          value={String(login)}
          onChangeText={(text) => setLogin(text)}
          placeholder="Логин"
          style={style.TextInput}
        />
        <View
          style={[
            style.TextInput,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <TextInput
            secureTextEntry={!show}
            value={String(password)}
            onChangeText={(pass) => setPassword(pass)}
            placeholder="Пароль"
            style={{width: 400 * size, padding: 0}}
          />
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setTimeout(() => {
                setShow(false);
              }, 3000);
            }}>
            <Text>{!show ? '👁' : ''}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.button} onPress={() => Submit()}>
          <Text style={style.buttonText}>Войти 🚪</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 29 * size,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    header: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 50 * size,
      marginTop: 150 * size,
      marginBottom: 150 * size,
    },
    content: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextInput: {
      width: 500 * size,
      height: 100 * size,
      marginRight: 25 * size,
      borderRadius: 25 * size,
      borderWidth: 2,
      borderColor: 'blue',
      padding: 0,
      paddingLeft: 20 * size,
      backgroundColor: '#FFFDC1',
      color: 'blue',
    },
    button: {
      width: 250 * size,
      height: 100 * size,
      marginRight: 25 * size,
      borderRadius: 25 * size,
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
