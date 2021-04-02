import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

export default () => {
  const balance = useSelector((state) => state.BalanceState);

  const header = [
    {text: 'Штрих код', style: 'barCode'},
    {text: 'Название', style: 'name'},
    {text: 'Начало ост', style: 'startRem'},
    {text: 'Приход', style: 'coming'},
    {text: 'Продажа', style: 'sale'},
    {text: 'Списание', style: 'writeOff'},
    {text: 'Остаток', style: 'remainder'},
    {text: 'Разница', style: 'difference'},
    {text: 'Цена', style: 'price'},
    {text: 'Сумма', style: 'amount'},
  ];

  const balanceItems = [
    {
      barCode: '1234567',
      name: 'Cheese Pillows Original 6x1кг',
      startRem: '10 шт',
      coming: '10 шт',
      sale: '10 шт',
      writeOff: '10 шт',
      remainder: '10 шт',
      difference: '10 шт',
      price: '8 000 сум',
      amount: '12 000 сум',
    },
    {
      barCode: '1234567',
      name: 'Cheese Pillows Original 6x1кг',
      startRem: '10 шт',
      coming: '10 шт',
      sale: '10 шт',
      writeOff: '10 шт',
      remainder: '10 шт',
      difference: '10 шт',
      price: '8 000 сум',
      amount: '12 000 сум',
    },
    {
      barCode: '1234567',
      name: 'Cheese Pillows Original 6x1кг',
      startRem: '10 шт',
      coming: '10 шт',
      sale: '10 шт',
      writeOff: '10 шт',
      remainder: '10 шт',
      difference: '10 шт',
      price: '8 000 сум',
      amount: '12 000 сум',
    },
    {
      barCode: '1234567',
      name: 'Cheese Pillows Original 6x1кг',
      startRem: '10 шт',
      coming: '10 шт',
      sale: '10 шт',
      writeOff: '10 шт',
      remainder: '10 шт',
      difference: '10 шт',
      price: '8 000 сум',
      amount: '12 000 сум',
    },
  ];
  const style = styles(balance.size);

  const icon = (key) => {
    switch (key) {
      case 'barCode':
        return (
          <Image
            style={style.iconStyle}
            source={require('../../assets/icons/barcode.png')}
          />
        );
      case 'name':
        return <View />;
      case 'amount':
      case 'price':
        return (
          <Image
            style={style.iconStyle}
            source={require('../../assets/icons/money.png')}
          />
        );
      default:
        return (
          <Text
            style={{
              color: 'orange',
              fontSize: 18 * balance.size,
              marginRight: 5 * balance.size,
            }}>
            ☰
          </Text>
        );
    }
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.balanceTable}>
        <Text style={style.headerText}>Баланс</Text>
        <View style={[style.balanceColumn, style.balanceTableHead]}>
          {header.map((item, index) => (
            <View key={index} style={[style[item.style], style.item]}>
              <Text numberOfLines={1} style={style.headText}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        {balanceItems.map((item, index) => (
          <View style={style.balanceColumn} key={index}>
            {Object.keys(item).map((key, i) => (
              <View style={[style[key], style.shadow, style.item]} key={i}>
                {icon(key)}
                <Text numberOfLines={1} style={style.balanceColumnText}>
                  {item[key]}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 25 * size,
      paddingBottom: 25 * size,
    },
    headerText: {
      fontSize: 20 * size,
      fontWeight: 'bold',
    },
    balanceTable: {
      padding: 5 * size,
      paddingTop: 40 * size,
      alignItems: 'center',
    },
    balanceTableHead: {
      borderTopColor: 'rgba(51, 42, 124, 1)',
      borderBottomColor: 'rgba(51, 42, 124, 1)',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
    },
    balanceColumn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12 * size,
      paddingLeft: 24 * size,
      paddingRight: 24 * size,
    },
    // header text style
    headText: {
      fontSize: 18 * size,
      fontWeight: 'bold',
    },
    // text style for all column
    balanceColumnText: {
      fontSize: 14 * size,
      fontWeight: '800',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40 * size,
    },
    //Бар код
    barCode: {
      width: 110 * size,
    },

    //Название
    name: {
      width: 206 * size,
    },

    //Начало ост
    startRem: {
      width: 110 * size,
    },

    // Приход
    coming: {
      width: 110 * size,
    },

    // Продажа
    sale: {
      width: 110 * size,
    },

    // списать
    writeOff: {
      width: 110 * size,
    },

    // Остаток
    remainder: {
      width: 110 * size,
    },

    // Разница
    difference: {
      width: 110 * size,
    },

    // Цена
    price: {
      width: 150 * size,
    },

    // Сумма
    amount: {
      width: 150 * size,
    },

    // footer
    footer: {
      width: '100%',
      height: 40 * size,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconStyle: {
      width: 20 * size,
      height: 20 * size,
      marginTop: 5 * size,
      marginRight: 5 * size,
    },
    shadow: {
      borderRadius: 8 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2 * size,
      },
      shadowRadius: 3 * size,
      shadowOpacity: 1.0,
      elevation: 1,
    },
  });
