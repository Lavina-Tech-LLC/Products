import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTypeAC} from '../../../Redux/RemainderReducer';

export default () => {
  const state = useSelector((state) => state.mainState);
  const remState = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const style = styles(state.size);
  return (
    <View style={style.container}>
      {remState.types.map((m, i) => (
        <TouchableOpacity
          key={i}
          style={[style.RemItem, remState.type === m ? style.select : {}]}
          onPress={() => dispatch(setTypeAC(m))}>
          <Text
            style={[style.RemText, remState.type === m ? style.noSelect : {}]}>
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '90%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    RemText: {
      fontWeight: 'bold',
      fontSize: 36 * size,
      color: 'rgba(9, 6, 51, 1)',
    },
    RemItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 290 * size,
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
    select: {
      backgroundColor: 'rgba(51, 42, 124, 1)',
      color: '#F8F8FC',
    },
    noSelect: {
      color: 'rgba(248, 248, 252, 1)',
    },
  });
