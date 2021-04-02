import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Select from './Select';
import {useDispatch, useSelector} from 'react-redux';
import {setProductAC, setTypeAC, setZoneAC} from '../Redux/RemainderReducer';
export default () => {
  const state = useSelector((state) => state.mainState);
  const remainder = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const size = state.size;
  const style = styles(size);

  const goBack = () => {
    switch (state.category) {
      case 'Остаток':
        if (remainder.type && remainder.zone && remainder.product) {
          dispatch(setProductAC(''));
        } else if (remainder.type && remainder.zone) {
          dispatch(setZoneAC(''));
        } else if (remainder.type) {
          dispatch(setTypeAC(''));
        }
        break;
    }
  };

  const Selectors = () => {};

  return state.category === 'Остаток' && remainder.type ? (
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
            dispatch(setProductAC(''));
            dispatch(setZoneAC(''));
            dispatch(setTypeAC(item));
          }}
          options={remainder.types}
        />
      ) : (
        <View />
      )}
      {remainder.zone ? (
        <Select
          defaultSelected={remainder.zone}
          onChange={(item) => {
            dispatch(setProductAC(''));
            dispatch(setZoneAC(item));
          }}
          options={remainder.zones}
        />
      ) : (
        <View />
      )}
      {remainder.product ? (
        <Select
          defaultSelected={remainder.product}
          onChange={(item) => {
            dispatch(setProductAC(item));
          }}
          options={remainder.products.map((i) => i.Name)}
        />
      ) : (
        <View />
      )}
    </View>
  ) : (
    <View />
  );
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
