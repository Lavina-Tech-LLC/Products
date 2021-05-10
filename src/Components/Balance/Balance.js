import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../Redux/BalanceReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import {styles} from './BalanceStyle';

const getTableSummary = (balanceInfo) => {
  return balanceInfo.reduce(
    (acc, curr) => {
      return {
        moreSumm: acc.moreSumm + (curr.difference > 0 ? curr.difference : 0),
        lessSumm:
          acc.lessSumm + (curr.difference < 0 ? Math.abs(curr.difference) : 0),
      };
    },
    {moreSumm: 0, lessSumm: 0},
  );
};

export default React.memo(() => {
  const balance = useSelector((state) => state.BalanceState);
  const dispatch = useDispatch();
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
  const {moreSumm, lessSumm} = getTableSummary(balance.products);
  const style = styles(balance.size);
  const gStyle = GlobalStyles(balance.size);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

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

  if (balance.loader)
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.balanceTable}>
        <Text style={style.headerText}>Баланс</Text>
        <View style={[style.balanceColumn, style.balanceTableHead]}>
          {header.map((item, index) => (
            <View
              key={index}
              style={[
                style[item.style],
                style.item,
                {justifyContent: 'center'},
              ]}>
              <Text numberOfLines={1} style={style.headText}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        {balance?.products?.length > 0 &&
          balance.products.map((item, index) => (
            <View style={style.balanceColumn} key={index}>
              {Object.keys(item).map((key, i) => (
                <View style={[style[key], style.shadow, style.item]} key={i}>
                  {icon(key)}
                  <Text numberOfLines={1} style={style.balanceColumnText}>
                    {item[key] || 0}
                  </Text>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
      <View style={style.footerContainer}>
        <View style={[style.footer, gStyle.shadow]}>
          <Text style={style.footerText}>Больше товар</Text>
          <Text style={style.footerText}>{moreSumm}</Text>
        </View>
        <View style={[style.footer, gStyle.shadow]}>
          <Text style={style.footerText2}>Меньше товар</Text>
          <Text style={style.footerText2}>-{lessSumm}</Text>
        </View>
        <View
          style={[
            style.footer,
            gStyle.shadow,
            {backgroundColor: 'rgba(51, 42, 124, 1)'},
          ]}>
          <Text style={style.footerText3}>Итого</Text>
          <Text style={style.footerText3}>{moreSumm - lessSumm}</Text>
        </View>
      </View>
    </View>
  );
});
