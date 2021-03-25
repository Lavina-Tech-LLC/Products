import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GlobalStyles from '../../../styles/GlobalStyles';
import {setZoneAC} from '../../../Redux/RemainderReducer';

export default () => {
  const state = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const gStyle = GlobalStyles(state.size);
  const style = styles(state.size);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20 * state.size,
        paddingBottom: 80 * state.size,
      }}
      style={style.zoneContainer}>
      <View style={style.zoneCreatorContaier}>
        <TouchableOpacity style={[gStyle.shadow, style.button]}>
          <Text style={style.buttonText1}>+</Text>
          <Text style={style.buttonText2}>Создать зону</Text>
        </TouchableOpacity>
      </View>
      {state.zones.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[style.zone, item === state.zone ? gStyle.selected : {}]}
          onPress={() => {
            dispatch(setZoneAC(item));
          }}>
          <Text
            style={[
              style.zoneText1,
              item === state.zone ? gStyle.selectedText : {},
            ]}>
            {item}
          </Text>
          <Text
            style={[
              style.zoneText2,
              item === state.zone ? gStyle.selectedText : {},
            ]}>
            {'>'}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = (size) =>
  StyleSheet.create({
    zoneContainer: {
      marginTop: 105 * size,
      marginLeft: 85 * size,
      marginRight: 85 * size,
      borderTopColor: 'rgba(218, 223, 225, .4)',
      borderTopWidth: 1,
    },
    zoneCreatorContaier: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      width: 351 * size,
      height: 70 * size,
    },
    buttonText1: {
      color: 'rgba(245, 84, 11, 1)',
      fontSize: 40 * size,
      marginRight: 30 * size,
      fontWeight: 'bold',
    },
    buttonText2: {
      fontSize: 35 * size,
      fontWeight: 'bold',
    },
    zone: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      marginTop: 30 * size,
      paddingLeft: 50 * size,
      paddingRight: 50 * size,
      width: '100%',
      borderColor: 'red',
      borderRadius: 25 * size,
      height: 80 * size,
    },
    zoneText1: {
      fontSize: 35 * size,
      fontWeight: 'bold',
      color: 'black',
    },
    zoneText2: {
      fontSize: 35 * size,
      fontWeight: 'bold',
      color: 'black',
    },
  });
