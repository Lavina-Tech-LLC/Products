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
import {useSelector} from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyles';

export default ({size}) => {
  const [bc, setBc] = useState('');
  const [name, setName] = useState('');
  const state = useSelector((state) => state.RemainderState);
  const gStyle = GlobalStyles(size);
  const style = styles(size);
  return (
    <View style={style.container}>
      <View style={style.barcodeContainer}>
        <View style={[gStyle.shadow, style.barcodeSearchContainer]}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/barcodeScaner.png')}
              style={{width: 35 * size, height: 45 * size}}
            />
          </TouchableOpacity>
          <TextInput
            disableFullscreenUI={true}
            value={bc}
            onChangeText={(t) => setBc(t)}
            textAlign="left"
            style={style.textInput}
            keyboardType="number-pad"
          />
          <TouchableOpacity>
            <Text>ⓧ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/open.png')}
              style={{width: 35 * size, height: 35 * size}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={[gStyle.shadow, style.barCodeListContainer]}>
          {state.products
            .filter((i) => String(i.Barcode).includes(String(bc)))
            .map((item, index) => (
              <Text key={index}>{item.Barcode}</Text>
            ))}
        </ScrollView>
      </View>
      <View></View>
      <View></View>
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    barCodeContainer: {
      flex: 1,
    },
    barcodeSearchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 450 * size,
      height: 80 * size,
      paddingLeft: 10 * size,
      paddingRight: 10 * size,
    },
    barCodeListContainer: {
      width: '100%',
      minHeight: 20 * size,
      top: 90 * size,
      position: 'absolute',
      borderColor: 'red',
    },
    textInput: {
      borderWidth: 0,
      padding: 0,
    },
    clear: {},
    openClose: {},
  });
