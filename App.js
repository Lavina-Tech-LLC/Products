import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Back from './src/AuxiliaryComponents/goBack';
import Scaner from './src/AuxiliaryComponents/Scaner';
import Balance from './src/Components/Balance/Balance';
import Coming from './src/Components/Coming/Coming';
import Order from './src/Components/Order/Order';
import Remainder from './src/Components/Remainder/Remainder';
import WriteOff from './src/Components/WriteOff/WriteOff';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  removeAllWriteOffAC,
  setCategoryAC,
  setDateAC,
  setIsCreateWriteOffAC,
  setShowMenuAC,
} from './src/Redux/MainReducer';
import Auth from './src/Auth/Auth';
import {setUidAC} from './src/Redux/UserReducer';
import {
  setProductsAC,
  setZoneAC,
  setProductAC,
  setTypeAC,
} from './src/Redux/RemainderReducer';
import {
  setProductsAC as setComingProductsAC,
  setProductAC as setComingProductAC,
  setListDoneInvoiceAC,
  setListInvoiceAC,
  setInvoiceAC,
} from './src/Redux/ComingReducer';
import {dateToString} from './src/Utils/helpers';
import Nomenclatures from './src/Components/Nomenclatures/Nomenclatures';

const App = () => {
  const [category, setCategory] = useState(<WriteOff />);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const state = useSelector((state) => state.mainState);
  const {UIDStructure, structures, isBoss} = useSelector(
    (state) => state.UserState,
  );
  const dispatch = useDispatch();
  const style = styles(state.size);
  useEffect(() => {
    SplashScreen.hide();
    return () => {
      dispatch(setUidAC(''));
    };
  }, []);

  useEffect(() => {
    switch (state.category) {
      case 'Остаток':
        setCategory(<Remainder />);
        break;
      case 'Приход':
        setCategory(<Coming />);
        break;
      case 'Списание':
        setCategory(<WriteOff />);
        break;
      case 'Баланс':
        setCategory(<Balance />);
        break;
      case 'Заказ':
        setCategory(<Order />);
        break;
      case 'Nomenclatures':
        setCategory(<Nomenclatures />);
        break;
    }
  }, [state.category]);
  if (!UIDStructure) return <Auth />;
  else
    return !state.scaner ? (
      <View style={style.container}>
        <StatusBar hidden />
        <View style={[style.menu, state.showMenu ? {} : style.hide]}>
          {state.categories.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={[style.menuItem, state.category === m ? style.select : {}]}
              onPress={() => dispatch(setCategoryAC(m))}>
              <Text
                style={[
                  style.menuText,
                  state.category === m ? style.TextSelect : {},
                ]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            style.content,
            {
              height:
                Dimensions.get('window').height -
                (state.showMenu ? 180 * state.size : 75 * state.size),
            },
          ]}>
          {category}
          <Back />
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Вы действительно хотите выйти? ',
              'Изменения не будет записаны.',
              [
                {
                  text: 'Нет, продолжить',
                  onPress: () => {
                    console.log('cancel');
                  },
                  style: 'cancel',
                },
                {
                  text: 'Да ',
                  onPress: () => {
                    dispatch(setUidAC(''));
                    dispatch(setZoneAC(''));
                    dispatch(setTypeAC(''));
                    dispatch(setProductsAC([]));
                    dispatch(setProductAC(''));
                    dispatch(setComingProductsAC([]));
                    dispatch(removeAllWriteOffAC());
                    dispatch(setComingProductAC(''));
                    dispatch(setListInvoiceAC([]));
                    dispatch(setListDoneInvoiceAC([]));
                    dispatch(setIsCreateWriteOffAC(false));
                    dispatch(setCategoryAC('Остаток'));
                    dispatch(setInvoiceAC({done: true, UIDInvoice: ''}));
                  },
                },
              ],
            );
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 50 * state.size,
            height: 50 * state.size,
            borderBottomRightRadius: 50 * state.size,
            borderWidth: 1,
            borderColor: 'orange',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 40 * state.size}}>⏎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 50 * state.size,
            height: 50 * state.size,
            borderBottomLeftRadius: 50 * state.size,
            borderWidth: 1,
            borderColor: 'orange',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20 * state.size}}>⚙️</Text>
          {/* <Image
            source={
              state.showMenu
                ? require('./src/assets/icons/close.png')
                : require('./src/assets/icons/open.png')
            }
            style={{width: 18 * state.size, height: 10 * state.size}}
          /> */}
        </TouchableOpacity>
        {/* modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={style.modalClose}
            />
            <View style={style.modalContent}>
              <View style={style.modalHead}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 35 * state.size,
                    }}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 35 * state.size,
                  }}>
                  {'🍕 ' +
                    structures.find((item) => item.Уид === UIDStructure)?.Имя}
                </Text>
              </View>
              <View style={style.modalMain}>
                <TouchableOpacity
                  onPress={() => dispatch(setShowMenuAC())}
                  style={style.openCloseMenu}>
                  <View
                    style={{
                      width: 70 * state.size,
                      height: 70 * state.size,
                      backgroundColor: 'white',
                      borderColor: 'green',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 35 * state.size,
                      borderWidth: 1,
                    }}>
                    <Image
                      source={
                        state.showMenu
                          ? require('./src/assets/icons/close.png')
                          : require('./src/assets/icons/open.png')
                      }
                      style={{
                        width: 54 * state.size,
                        height: 30 * state.size,
                      }}
                    />
                  </View>
                  <Text style={{color: 'white', marginTop: 30 * state.size}}>
                    {!state.showMenu ? 'Oткрыть меню' : 'Закрыть меню'}
                  </Text>
                </TouchableOpacity>
                {isBoss && (
                  <TouchableOpacity
                    style={[
                      style.menuItem,
                      state.category === 'Nomenclatures' ? style.select : {},
                    ]}
                    onPress={() => dispatch(setCategoryAC('Nomenclatures'))}>
                    <Text
                      style={[
                        style.menuText,
                        state.category === 'Nomenclatures'
                          ? style.TextSelect
                          : {},
                      ]}>
                      Номенклатуры
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  disabled={!isBoss}
                  onPress={() => {
                    setShowDatePicker(true);
                  }}>
                  <Text style={{color: 'white'}}>
                    📅{'  ' + dateToString(state.date)}
                  </Text>
                  <Text style={{color: 'white', marginTop: 30 * state.size}}>
                    {isBoss ? ' Задать дату' : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {showDatePicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={state.date || new Date()}
              is24Hour={true}
              display="calendar"
              onChange={(event, d) => {
                setShowDatePicker(false);
                d && dispatch(setDateAC(d));
              }}
            />
          ) : (
            <View />
          )}
        </Modal>
      </View>
    ) : (
      <Scaner />
    );
};

const styles = (size) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#E5E5E5',
      padding: 40 * size,
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 25 * size,
      marginRight: 4,
    },
    menuItem: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 280 * size,
      height: 80 * size,
      borderRadius: 25 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10 * size,
      },
      shadowRadius: 10 * size,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    menuText: {
      fontWeight: 'bold',
      fontSize: 36 * size,
      color: 'rgba(9, 6, 51, 1)',
    },
    select: {
      backgroundColor: 'rgba(51, 42, 124, 1)',
      color: '#F8F8FC',
    },
    TextSelect: {
      color: 'rgba(248, 248, 252, 1)',
    },
    content: {
      width: '100%',
      borderRadius: 25 * size,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10 * size,
      },
      shadowRadius: 10 * size,
      shadowOpacity: 1.0,
      elevation: 3,
    },
    hide: {
      display: 'none',
    },

    //for Modal
    modalContainer: {
      flex: 1,
    },
    modalClose: {
      width: '100%',
      height: Dimensions.get('window').height * 0.6,
    },
    modalContent: {
      width: '100%',
      height: Dimensions.get('window').height * 0.4,
      backgroundColor: 'rgba(1,1,1,.5)',
    },
    modalHead: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalMain: {
      width: '100%',
      marginRight: 40 * size,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    openCloseMenu: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export default App;
