import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import Select from './Select';
export default () => {
  const [path, setPath] = useState('>>>');
  const state = useSelector((state) => state.mainState);
  const size = state.size;
  const style = styles(size);

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.backButton}>
        <Image
          style={{width: 12 * size, height: 15 * size}}
          source={require('../assets/icons/back.png')}
        />
        <Text style={style.textBackButton}>Назад</Text>
      </TouchableOpacity>
      <Select
        defaultSelected={path}
        onChange={(item) => {
          setPath(item);
        }}
        options={[
          '123',
          '45dsadwdsawdsdawds dsasssssdwASdsadawdsadawdasadwdsdsadadS6',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
          '>>>',
        ]}
      />
    </View>
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
