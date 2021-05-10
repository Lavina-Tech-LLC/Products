import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setStructureAC, setUidAC} from '../Redux/UserReducer';
import GlobalStyles from '../styles/GlobalStyles';

export default () => {
  const state = useSelector((s) => s.mainState);
  const user = useSelector((s) => s.UserState);
  const dispatch = useDispatch();

  const size = state.size;
  const gStyle = GlobalStyles(size);
  const style = styles(size);

  return (
    <View style={[gStyle.shadow, style.container]}>
      <View
        style={{
          position: 'absolute',
          left: 50 * state.size,
          top: 50 * state.size,
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => dispatch(setStructureAC([]))}>
          <Text style={{fontWeight: 'bold', fontSize: 70 * state.size}}>⏎</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.header}> Bыберите структурy</Text>
      <ScrollView
        style={{
          borderLeftWidth: 1,
          borderRightWidth: 1,
          padding: 25 * state.size,
          backgroundColor: 'grey',
          borderRadius: 25 * state.size,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: 'grey',
          paddingBottom: 30,
        }}>
        {user.structures.length > 0 ? (
          user.structures.map((item, index) => (
            <TouchableOpacity
              key={item.Уид}
              style={[
                gStyle.shadow,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 950 * state.size,
                  height: 90 * state.size,
                  marginTop: 25 * state.size,
                },
              ]}
              onPress={() => dispatch(setUidAC(item.Уид))}>
              <Text style={{fontWeight: 'bold', fontSize: 35 * state.size}}>
                {item.Имя}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View />
        )}
      </ScrollView>

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
      paddingBottom: 100 * size,
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
