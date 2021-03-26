'use strict';
import React, {PureComponent} from 'react';
import {
  Alert,
  Text,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(setScanerAC(false))}>
        <Text style={{color: 'white', fontSize: 35}}>🡰</Text>
      </TouchableOpacity>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={({data}) => {
          Alert.alert(data);
        }}
      />
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
  preview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
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
});
