'use strict';
import React, {PureComponent, useState} from 'react';
import {
  Alert,
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';
import {setProductAC, setSearchComingAC} from '../Redux/ComingReducer';
import {setScanerAC, setSearchAC, updateWriteOffAC} from '../Redux/MainReducer';
import { setProductAC as setProductForRem } from '../Redux/RemainderReducer';

export default (props) => {
  const state = useSelector((state) => state.mainState);
  const coming = useSelector((state) => state.ComingState);
  const rem = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const [torch, setTorch] = useState(false);

  const onRead = ({data}) => {
    try {
      switch (state.category) {
        case 'Остаток':
          {
            const product = rem.products.find((item) =>
            String(
              item.Barсode || item.Barсode === 0
                ? item.Barсode
                : item.Barcode,
            ) === String(data)
          )
          if(product){
                dispatch(setProductForRem(product));
          }else
          dispatch(setSearchAC(Number(data)));
          break;}
        case 'Приход':{
          const product = coming.products.find((item) =>
          String(item.Barcode) === String(data)
        )
        if(!coming.invoice.done && product){
              dispatch(setProductAC(product));
        }else
          dispatch(setSearchComingAC(Number(data)));
          break;
}
        case 'Списание':
          dispatch(
            updateWriteOffAC({
              index: state.index,
              data: {
                UIDProduct: '',
                disable: false,
                bc: Number(data),
                name: state.writeoff[state.index].name,
                amount: state.writeoff[state.index].amount,
              },
            }),
          );
          break;
      }
      dispatch(setScanerAC(false));
    } catch (error) {
      Alert.alert(error + '\nResult: ' + data);
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        flashMode={
          torch
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onRead}
      />
      <TouchableOpacity
        style={styles.cancel}
        onPress={() => dispatch(setScanerAC(false))}>
        <Image
          style={{width: 24, height: 30}}
          source={require('../assets/icons/back-1.png')}
        />
      </TouchableOpacity>
      <Image
        style={styles.scaning}
        source={require('../assets/icons/scaning.png')}
      />
      <TouchableOpacity
        style={styles.torch}
        onPress={() => setTorch((prev) => !prev)}>
        <Text style={torch ? styles.torchOn : styles.torchOff}>
          {torch ? '⚡ On' : '⚡ Off'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
  },
  cancel: {
    position: 'absolute',
    width: 60,
    height: 40,
    left: 30,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.2)',
  },
  preview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  scaning: {
    width: 250,
    height: 250,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  torch: {
    position: 'absolute',
    width: 80,
    height: 40,
    right: 30,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.2)',
  },
  torchOff: {
    color: 'black',
    fontSize: 24,
  },
  torchOn: {
    color: 'white',
    fontSize: 24,
  },
});
