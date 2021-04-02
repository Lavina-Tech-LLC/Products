import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
export default () => {
  const {width, height} = Dimensions.get('window');
  return (
    <View
      style={{
        position: 'relative',
        width,
        height,
        left: 0,
        top: height,
        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex: 10000000,
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
