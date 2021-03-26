import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Back from './src/AuxiliaryComponents/goBack';
import Scaner from './src/AuxiliaryComponents/Scaner';
import Balance from './src/Components/Balance/Balance';
import Remainder from './src/Components/Remainder/Remainder';
import {setCategoryAC} from './src/Redux/MainReducer';

const App = () => {
  const state = useSelector((state) => state.mainState);
  const dispatch = useDispatch();
  const style = styles(state.size);

  return !state.scaner ? (
    <View style={style.container}>
      <StatusBar hidden />
      <View style={style.menu}>
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
      <View style={style.content}>
        <Remainder />
        <Back />
      </View>
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
      height: Dimensions.get('window').height - 180 * size,
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
  });
};
export default App;
