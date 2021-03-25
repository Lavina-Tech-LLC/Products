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
      style={style.container}>
      <View style={style.productCreatorContaier}>
        <TouchableOpacity style={[gStyle.shadow, style.button]}>
          <Text style={style.buttonText1}>+</Text>
          <Text style={style.buttonText2}>Добавить ингредиент</Text>
        </TouchableOpacity>
      </View>
      <View style={style.productsContainer}>
        {state.products.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              gStyle.shadow,
              style.product,
              item === state.zone ? gStyle.selected : {},
            ]}
            onPress={() => {}}>
            <Text numberOfLines={1} style={style.productName}>
              {item.Name}
            </Text>
            <View style={style.Barcode}>
              <Text style={style.icon}>☰</Text>
              <Text style={style.iconText}>{item.Amount}</Text>
            </View>
            <View style={style.Barcode}>
              <Text style={[style.icon, {fontSize: 15 * state.size}]}>
                ║▌║║▌
              </Text>
              <Text style={style.iconText}>{item.Barcode}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      marginTop: 105 * size,
      marginLeft: 85 * size,
      marginRight: 85 * size,
      borderTopColor: 'rgba(218, 223, 225, .4)',
      borderTopWidth: 1,
    },
    productCreatorContaier: {
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
      fontSize: 30 * size,
      marginRight: 30 * size,
      fontWeight: 'bold',
    },
    buttonText2: {
      fontSize: 24 * size,
      fontWeight: 'bold',
    },

    productsContainer: {
      paddingTop: 25 * size,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
    product: {
      justifyContent: 'space-between',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      marginTop: 30 * size,
      marginLeft: 30 * size,
      padding: 25 * size,

      borderColor: 'red',
      borderRadius: 25 * size,
      width: 390 * size,
      height: 226 * size,
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
    productName: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    Barcode: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: 'rgba(245, 84, 11, 1)',
      marginRight: 15 * size,
    },
    iconText: {},
  });
