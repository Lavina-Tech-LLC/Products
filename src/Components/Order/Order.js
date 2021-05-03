import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeNumber,
  changeTextAC,
  deleteElementAC,
  downSortAC,
  getProducts,
  setChangeAC,
  setEndDateAC,
  setStartDateAC,
  upSortAC,
  warehouse,
} from '../../Redux/OrderReducer';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getLastDate} from '../../Utils/helpers';
import {styles} from './Styles';
import Modal from './Modal';

export default React.memo(() => {
  //redux hooks
  const order = useSelector((state) => state.OrderState);
  const dispatch = useDispatch();
  // states
  const [count, setcount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [load, setLoad] = useState('');
  //  for modal
  const [showDatePicker, setShowDatePicker] = useState(false);
  // for date
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(
    new Date(getLastDate('year'), getLastDate('month'), getLastDate('day')),
  );

  useEffect(() => {
    !order?.products.length &&
      dispatch(
        getProducts({
          startdate: `${date2.getFullYear()}${
            date2.getMonth() + 1 < 9
              ? '0' + (date2.getMonth() + 1)
              : date2.getMonth() + 1
          }${date2.getDate() > 9 ? date2.getDate() : '0' + date2.getDate()}`,
          enddate: `${date.getFullYear()}${
            date.getMonth() + 1 < 9
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
          }${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`,
        }),
      );
  }, []);
  useEffect(() => {
    dispatch(
      setStartDateAC(
        `${date2.getFullYear()}${
          date2.getMonth() + 1 < 9
            ? '0' + (date2.getMonth() + 1)
            : date2.getMonth() + 1
        }${date2.getDate() > 9 ? date2.getDate() : '0' + date2.getDate()}`,
      ),
    );
    dispatch(
      setEndDateAC(
        `${date.getFullYear()}${
          date.getMonth() + 1 < 9
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
        }${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`,
      ),
    );
  }, [date, date2]);

  const header = [
    {text: 'Название', style: 'name'},
    {text: 'Ср. расход в день', style: 'average'},
    {text: 'Остаток', style: 'inputText'},
    {text: 'Норма', style: 'inputText'},
    {text: 'Нужные', style: 'inputText'},
    {text: 'Экстренное количество', style: 'inputText'},
  ];
  const style = styles(order.size);
  if (order.loader && !(order.products?.length > 0))
    return (
      <View
        size={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

  return (
    <View style={style.container}>
      <Modal args={{modalVisible, setModalVisible}} />
      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={style.button}>
          <Text style={{fontSize: 35 * order.size, fontWeight: 'bold'}}>
            Изменить
          </Text>
        </TouchableOpacity>

        <View
          style={[
            style.button,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'auto',
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker('startDate');
            }}>
            <Text
              style={{
                fontSize: 35 * order.size,
                fontWeight: 'bold',
                marginRight: 30 * order.size,
              }}>
              {String(date2.getDate()) +
                '/' +
                String(date2.getMonth() + 1) +
                '/' +
                date2.getFullYear()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker('finishDate');
            }}>
            <Text
              style={{
                fontSize: 35 * order.size,
                fontWeight: 'bold',
              }}>
              {String(date.getDate()) +
                '/' +
                String(date.getMonth() + 1) +
                '/' +
                date.getFullYear()}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            setLoad('warehouse');
            dispatch(warehouse(setLoad));
          }}
          style={style.button}>
          {load === 'warehouse' ? (
            <ActivityIndicator size="small" color="blue" />
          ) : (
            <Text style={{fontSize: 35 * order.size, fontWeight: 'bold'}}>
              Заказать
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={style.balanceTable}>
        <View style={[style.balanceColumn, style.balanceTableHead]}>
          <TouchableOpacity
            onPress={() => {
              setLoad('change');
              dispatch(changeNumber(setLoad));
            }}
            style={[
              style.sort,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            {load === 'change' ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Text>{order.change ? '💾' : ''}</Text>
            )}
          </TouchableOpacity>
          {header.map((item, index) => (
            <View key={index} style={[style[item.style], style.item]}>
              <Text style={style.headText}>{item.text}</Text>
            </View>
          ))}
          <View style={style.delete} />
        </View>
      </View>
      <ScrollView contentContainerStyle={style.balanceTable}>
        {order.products
          .sort((a, b) => a.Number - b.Number)
          .map((item, index) => (
            <View
              style={style.balanceColumn}
              key={item.UIDProduct + (index === count ? count : '')}>
              <View style={[style.sort, style.shadow, style.item]}>
                <TouchableOpacity
                  onPress={() => {
                    setcount(index);
                    dispatch(
                      downSortAC({
                        index,
                      }),
                    );
                    !order.change && dispatch(setChangeAC(true));
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70 * order.size,
                  }}>
                  <Image
                    style={{width: 50 * order.size}}
                    source={require('../../assets/icons/open.png')}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: 5 * order.size,
                    height: 60 * order.size,
                    backgroundColor: 'grey',
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setcount(index);
                    dispatch(
                      upSortAC({
                        index,
                      }),
                    );
                    !order.change && dispatch(setChangeAC(true));
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70 * order.size,
                  }}>
                  <Image
                    style={{width: 50 * order.size}}
                    source={require('../../assets/icons/close.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={[style.shadow, style.name, style.item]}>
                <Text numberOfLines={1} style={style.text}>
                  {item.Name}
                </Text>
              </View>
              <View style={[style.shadow, style.Average, style.item]}>
                <Text style={style.iconText}>☰</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: 10 * order.size,
                    width: 200 * order.size,
                    fontSize: 28 * order.size,
                  }}>
                  {item.Average ? String(item.Average) : '0.00'}
                </Text>
              </View>
              <View style={[style.shadow, style.inputText, style.item]}>
                <Text style={style.iconText}>☰</Text>
                <Text style={style.textInput}>
                  {item.Balance !== null ? String(item.Balance) : '0'}
                </Text>
              </View>
              <View style={[style.shadow, style.inputText, style.item]}>
                <Text style={style.iconText}>☰</Text>
                <TextInput
                  keyboardType="numeric"
                  disableFullscreenUI={true}
                  value={String(item.Normal)}
                  style={style.textInput}
                />
              </View>
              <View style={[style.shadow, style.inputText, style.item]}>
                <Text style={style.iconText}>☰</Text>
                <TextInput
                  disableFullscreenUI={true}
                  value={String(item.Normal - (item.Balance || 0))}
                  style={style.textInput}
                  keyboardType="numeric"
                />
              </View>
              <View style={[style.shadow, style.inputText, style.item]}>
                <Text style={style.iconText}>☰</Text>
                <TextInput
                  disableFullscreenUI={true}
                  value={String(item.Extra)}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    dispatch(changeTextAC({index, text, key: 'Extra'}));
                  }}
                  style={style.textInput}
                />
              </View>
              <View style={style.delete}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(deleteElementAC(index));
                  }}>
                  <Text style={{fontSize: 40 * order.size}}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="calendar"
          onChange={(event, d) => {
            if (d !== undefined) {
              switch (showDatePicker) {
                case 'startDate':
                  setDate2(d);
                  break;
                case 'finishDate':
                  setDate(d);
                  break;
              }
            }
            setShowDatePicker('');
          }}
        />
      ) : (
        <View />
      )}
    </View>
  );
});
