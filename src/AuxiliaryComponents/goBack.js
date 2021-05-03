import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Select from './Select';
import {useDispatch, useSelector} from 'react-redux';
import {setProductAC, setTypeAC, setZoneAC} from '../Redux/RemainderReducer';
import {setIsCreateWriteOffAC} from '../Redux/MainReducer';
import {setProductAC as setComingProductAC} from '../Redux/ComingReducer';
export default () => {
  const state = useSelector((state) => state.mainState);
  const coming = useSelector((state) => state.ComingState);
  const remainder = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const size = state.size;
  const style = styles(size);

  const goBack = () => {
    switch (state.category) {
      case 'Остаток':
        //if (remainder.type && remainder.zone && remainder.product) {
        if (remainder.type && remainder.product) {
          dispatch(setProductAC(''));
        }
        // else if (remainder.type && remainder.zone) {
        //   dispatch(setZoneAC(''));
        // }
        else if (remainder.type) {
          dispatch(setTypeAC(''));
        }
        break;
      case 'Списание':
        dispatch(setIsCreateWriteOffAC(false));
        break;
      case 'Приход':
        dispatch(setComingProductAC(''));
        break;
    }
  };

  const Selectors = () => {};
  switch (state.category) {
    case 'Остаток':
      return remainder.type ? (
        <View style={style.container}>
          <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
            <Image
              style={{width: 12 * size, height: 15 * size}}
              source={require('../assets/icons/back.png')}
            />
            <Text style={style.textBackButton}>Назад</Text>
          </TouchableOpacity>
          {remainder.type ? (
            <Select
              defaultSelected={remainder.type}
              onChange={(item) => {
                if (remainder.zone !== item.Name)
                  Alert.alert(
                    '',
                    'Закройте осталные процессы по учету остатков (' +
                      remainder.zone +
                      ')',
                  );
                // dispatch(setProductAC(''));
                // dispatch(setZoneAC(''));
                // dispatch(setTypeAC(item));
              }}
              options={remainder.types.map((i) => ({
                Name: i,
              }))}
            />
          ) : (
            <View />
          )}
          {remainder.product ? (
            <Select
              defaultSelected={remainder.product.Name}
              onChange={(item) => {
                dispatch(setProductAC(item));
              }}
              options={remainder.products}
            />
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View />
      );
    case 'Списание':
      return state.isCreate ? (
        <View style={style.container}>
          <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
            <Image
              style={{width: 12 * size, height: 15 * size}}
              source={require('../assets/icons/back.png')}
            />
            <Text style={style.textBackButton}>Назад</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      );
    case 'Приход':
      return coming.product ? (
        <View style={style.container}>
          <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
            <Image
              style={{width: 12 * size, height: 15 * size}}
              source={require('../assets/icons/back.png')}
            />
            <Text style={style.textBackButton}>Назад</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      );
    default:
      return <View />;
  }
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: 80 * size,
      top: 24 * size,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 30 * size,
      height: 58 * size,
    },
    textBackButton: {
      fontSize: 28 * size,
      color: 'rgba(245, 84, 11, 1)',
      marginLeft: 12 * size,
    },
  });
