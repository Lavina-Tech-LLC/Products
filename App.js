import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Back from './src/AuxiliaryComponents/goBack';
import Scaner from './src/AuxiliaryComponents/Scaner';
import Balance from './src/Components/Balance/Balance';
import Coming from './src/Components/Coming/Coming';
import Basic from './src/Components/Order/Order';
import Remainder from './src/Components/Remainder/Remainder';
import WriteOff from './src/Components/WriteOff/WriteOff';
import {setCategoryAC, setShowMenuAC} from './src/Redux/MainReducer';
import Auth from './src/Auth/Auth';
import {setUidAC} from './src/Redux/UserReducer';

const App = () => {
  const [category, setCategory] = useState(<WriteOff />);
  const state = useSelector((state) => state.mainState);
  const UIDStructure = useSelector((state) => state.UserState.UIDStructure);
  const dispatch = useDispatch();
  const style = styles(state.size);
  useEffect(() => {
    SplashScreen.hide();
    return () => {
      dispatch(setUidAC(''));
    };
  }, []);
  useEffect(() => {
    switch (state.category) {
      case 'Остаток':
        setCategory(<Remainder />);
        break;
      case 'Приход':
        setCategory(<Coming />);
        break;
      case 'Списание':
        setCategory(<WriteOff />);
        break;
      case 'Баланс':
        setCategory(<Balance />);
        break;
      case 'Заказ':
        setCategory(<Basic />);
        break;
    }
  }, [state.category]);
  if (!UIDStructure) return <Auth />;
  else
    return !state.scaner ? (
      <View style={style.container}>
        <StatusBar hidden />
        <View style={[style.menu, state.showMenu ? {} : style.hide]}>
          {state.categories.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={[style.menuItem, state.category === m ? style.select : {}]}
              onPress={() => dispatch(setCategoryAC(m))}>
              <Text
                style={[
                  style.menuText,
                  state.category === m ? style.TextSelect : {},
                ]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            style.content,
            {
              height:
                Dimensions.get('window').height -
                (state.showMenu ? 180 * state.size : 75 * state.size),
            },
          ]}>
          {category}
          <Back />
        </View>
        <TouchableOpacity
          onPress={() => dispatch(setShowMenuAC())}
          style={{
            position: 'absolute',
            top: 1,
            right: 1,
            width: 18,
            height: 18,
            borderRadius: 9,
            borderWidth: 1,
            borderColor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              state.showMenu
                ? require('./src/assets/icons/close.png')
                : require('./src/assets/icons/open.png')
            }
            style={{width: 18 * state.size, height: 10 * state.size}}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <Scaner />
    );
};

const styles = (size) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#E5E5E5',
      padding: 40 * size,
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 25 * size,
      marginRight: 4,
    },
    menuItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 280 * size,
      height: 80 * size,
      borderRadius: 25 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10 * size,
      },
      shadowRadius: 10 * size,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    menuText: {
      fontWeight: 'bold',
      fontSize: 36 * size,
      color: 'rgba(9, 6, 51, 1)',
    },
    select: {
      backgroundColor: 'rgba(51, 42, 124, 1)',
      color: '#F8F8FC',
    },
    TextSelect: {
      color: 'rgba(248, 248, 252, 1)',
    },
    content: {
      width: '100%',
      borderRadius: 25 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10 * size,
      },
      shadowRadius: 10 * size,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    hide: {
      display: 'none',
    },
  });
};
export default App;
