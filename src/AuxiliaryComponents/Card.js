import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {summa} from '../Utils/helpers';

export default ({item, star, state, index, onClickCard, color, size, otherStyle}) => {
    const style = styles(state.size);
    const gStyle = GlobalStyles(state.size);
    return (
      <TouchableOpacity
        disabled={onClickCard === undefined}
        style={[
          gStyle.shadow,
          style.product,
          size || {},
          otherStyle || {},
          color ? {backgroundColor: color} : {},
        ]}
        onPress={() => {
          onClickCard();
        }}>
        {star ? (
          <View style={style.star}>
            <Text style={{fontSize: 25 * state.size}}>★</Text>
          </View>
        ) : (
          <View />
        )}
        <Text numberOfLines={1} style={style.productName}>
          {item.Name}
        </Text>
        <View style={style.Barcode}>
          <Text style={style.icon}>☰</Text>
          <Text style={style.iconText}>{item.Amount}</Text>
        </View>
        {state.invoice?.done || item.CurrentAmount ? (
          <View style={style.Barcode}>
            <Text style={style.icon}>✓</Text>
            <Text style={style.iconText}>
              {!state.invoice?.done
                ? String(item.CurrentAmount)
                  ? String(item.CurrentAmount)
                  : ''
                : item.AmountDone}
            </Text>
          </View>
        ) : (
          <View />
        )}
        {item.difference || item.difference == 0?
          <View style={style.Barcode}>
          <Text style={[style.icon, {fontSize: 40 * state.size}]}>±</Text>
          <Text style={style.iconText}>
            {item.difference}
          </Text>
        </View>:<View/>}
        <View style={style.Barcode}>
          <Text style={[style.icon, {fontSize: 15 * state.size}]}>║▌║</Text>
          <Text style={style.iconText}>
            {item.Barсode || item.Barсode === 0 ? item.Barсode : item.Barcode}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
const styles = (size) =>
  StyleSheet.create({
    product: {
      justifyContent: 'space-between',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      marginTop: 30 * size,
      marginLeft: 30 * size,
      padding: 25 * size,
      paddingTop: 5 * size,
      borderColor: 'red',
      borderRadius: 25 * size,
      width: 390 * size,
      height: 250 * size,
    },
    star: {
      width: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
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
      width: 50 * size,
    },
    iconText: {
      fontSize: 24 * size,
      fontWeight: 'bold',
    },
  });
