import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setScanerAC} from '../../Redux/MainReducer';
import {setSearchAC} from '../../Redux/ComingReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import {styles} from './ComingStyle';

export default () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ComingState);
  const style = styles(state.size);
  const gStyle = GlobalStyles(state.size);
  return (
    <View style={style.constainer}>
      <View style={[style.barCode]}>
        <TextInput
          keyboardType="numeric"
          value={String(state.search)}
          onChangeText={(text) => dispatch(setSearchAC(text))}
          disableFullscreenUI={true}
          placeholder="Штрих код"
          editable
          style={style.input}
        />
        <TouchableOpacity
          onPress={() => dispatch(setScanerAC(true))}
          style={style.barCodeButton}>
          <Image
            source={require('../../assets/icons/barcodeScaner.png')}
            style={{width: 25 * state.size, height: 25 * state.size}}></Image>
        </TouchableOpacity>
      </View>

      <View style={style.content}>
        <View style={[gStyle.shadow, style.overheadContainer]}>
          <View style={style.overHeadText}>
            <Text
              style={{
                fontSize: 24 * state.size,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {'Накладные \n(для прихода)'}
            </Text>
          </View>
          <ScrollView style={{}} contentContainerStyle={{}}></ScrollView>
        </View>
        <View style={[gStyle.shadow, style.productContainer]}></View>
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
    </View>
  );
};
