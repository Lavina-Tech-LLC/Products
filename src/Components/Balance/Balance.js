import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Switch,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const state = useSelector((state) => state.mainState);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const dispatch = useDispatch();
  const height =
    Dimensions.get('window').height -
    (state.showMenu ? 190 * state.size : 85 * state.size);

  const header = [
    {text: 'Штрих код', style: 'barCode'},
    {text: 'Название', style: 'name'},
    {text: 'Начало ост', style: 'startRem'},
    {text: 'Приход', style: 'coming'},
    {text: 'Продажа', style: 'sale'},
    {text: 'Списание', style: 'writeOff'},
    {text: 'Остаток', style: 'remainder'},
    {text: 'Разница-Принята', style: 'difAcc'},
    {text: 'Прочие', style: 'others'},
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

  const Icon = (key) => {
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
  const keyExtractor = useCallback(
    (item, index) => item.barCode + item.name + index,
    [],
  );
  const render = useCallback(
    (props) => (
      <Balance
        Icon={Icon}
        item={props.item}
        index={props.index}
        style={style}
      />
    ),
    [],
  );

  if (balance.loader)
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  return (
    <View style={style.container}>
      <View
        style={[
          style.balanceTable,
          {
            height,
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            top: 32 * state.size,
            left: 90 * state.size,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20 * state.size,
              color: 'red',
              fontWeight: 'bold',
              marginLeft: 25 * state.size,
            }}>
            C разницей
          </Text>

          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={toggleCheckBox ? '#f5dd4b' : '#f4f3f4'}
            style={{transform: [{scaleX: 0.5}, {scaleY: 0.5}]}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            value={toggleCheckBox}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 25 * state.size,
            paddingRight: 25 * state.size,
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              style={{width: 40 * state.size, height: 40 * state.size}}
              source={require('../../assets/icons/calc.png')}
            />
          </TouchableOpacity>
          <Text style={style.headerText}>Баланс</Text>
          {load ? (
            <ActivityIndicator color="green" size="small" />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLoad(true);
                dispatch(getProducts(() => setLoad(false)));
              }}>
              <Image
                source={require('../../assets/icons/sync.png')}
                style={{width: 60 * state.size, height: 60 * state.size}}
              />
            </TouchableOpacity>
          )}
        </View>

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
        {balance?.products?.length > 0 && (
          <FlatList
            keyExtractor={keyExtractor}
            extraData={toggleCheckBox}
            data={balance.products.filter(
              (item) => item.difference || !toggleCheckBox,
            )}
            renderItem={render}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={style.footerContainer}>
          <View
            style={[
              style.footer,
              {
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 100 * state.size,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={{color: 'white', fontSize: 50 * state.size}}>✕</Text>
            </TouchableOpacity>
          </View>
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
      </Modal>
    </View>
  );
});

const Balance = React.memo(({item, style, index, Icon}) => {
  return (
    <View style={style.balanceColumn} key={index}>
      {Object.keys(item).map((key, i) => (
        <View
          style={[style[key], style.shadow, style.item]}
          key={i + 'Ld' + item.barCode + key}>
          {Icon(key)}
          <Text numberOfLines={1} style={style.balanceColumnText}>
            {item[key] || 0}
          </Text>
        </View>
      ))}
    </View>
  );
});
