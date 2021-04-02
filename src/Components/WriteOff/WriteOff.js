import React, {useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setScanerAC} from '../../Redux/MainReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import Create from './Create';

export default () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.mainState);
  const style = styles(state.size);
  const gStyle = GlobalStyles(state.size);

  return (
    <View style={style.container}>
      {false ? (
        <View style={style.content}>
          <TouchableOpacity
            onPress={() => dispatch(setScanerAC(true))}
            style={style.addButton}>
            <View style={style.addText}>
              <Text style={{fontSize: 35 * state.size, color: 'white'}}>+</Text>
            </View>
            <Text style={{}}>Создать накладную</Text>
          </TouchableOpacity>
          <View style={[gStyle.shadow, style.overheadContainer]}>
            <View style={style.overHeadText}>
              <Text
                style={{
                  fontSize: 24 * state.size,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {'Принятые \nнакладные'}
              </Text>
            </View>
            <ScrollView style={{}} contentContainerStyle={{}}></ScrollView>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {Create({size: state.size})}
          {Create({size: state.size})}
        </View>
      )}
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * size,
      paddingLeft: 40 * size,
    },
    content: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    overheadContainer: {
      width: 290 * size,
      height: '100%',
    },
    overHeadText: {
      width: '100%',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      padding: 10 * size,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 471 * size,
      height: 100 * size,
    },
    addText: {
      width: 100 * size,
      height: 100 * size,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(51, 42, 124, 1)',
      borderRadius: 25 * size,
    },
  });
