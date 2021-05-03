import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../AuxiliaryComponents/Card';
import {
  addWriteOffAC,
  setIsCreateWriteOffAC,
  setScanerAC,
  getOverheadWriteOff,
  getWriteOffInfo,
  writeoff,
  removeAllWriteOffAC,
  getListProducts,
} from '../../Redux/MainReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import Create from './Create';

export default React.memo(() => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.mainState);
  const style = styles(state.size);
  const gStyle = GlobalStyles(state.size);
  const [marginB, setMarginB] = useState('start');
  const [position, setPosition] = useState(0);
  const [UIDInvoice, setUIDInvoice] = useState('');
  const [prevPosition, setPrevPosition] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getListProducts());
    dispatch(getOverheadWriteOff());
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setMarginB(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setMarginB(0),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    if (marginB !== 'start') {
      if (marginB > 0) {
        const newPOsition = state.index * 110 * state.size + 130 * state.size;
        setPrevPosition(position);
        setTimeout(() => {
          scrollRef?.current?.scrollTo({
            x: 0,
            y: newPOsition,
          });
        }, 0);
      } else {
        setTimeout(() => {
          scrollRef?.current?.scrollTo({
            x: 0,
            y: prevPosition,
          });
        }, 0);
      }
    }
  }, [marginB]);

  return (
    <View style={style.container}>
      {!state.isCreate ? (
        <View style={style.content}>
          <View style={style.content1}>
            <TouchableOpacity
              onPress={() => dispatch(setIsCreateWriteOffAC(true))}
              style={style.addButton}>
              <View style={style.addText}>
                <Text style={{fontSize: 35 * state.size, color: 'white'}}>
                  +
                </Text>
              </View>
              <Text style={{}}>Создать накладную</Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.writeOffInfo.map((product, index) => (
                <Card
                  key={product.UID}
                  index={index}
                  item={product}
                  star={false}
                  onClickCard={() => {}}
                  selected={false}
                  state={state}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[gStyle.shadow, style.overheadContainer]}>
            <View style={style.overHeadText}>
              <Text
                style={{
                  fontSize: 24 * state.size,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {'Принятые \nнакладные'}
              </Text>
            </View>
            <ScrollView
              style={{}}
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              {state.overheadWriteOff.map((product, index) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getWriteOffInfo(product.UIDInvoice));
                    setUIDInvoice(product.UIDInvoice);
                  }}
                  style={[
                    style.writeOffContainer,
                    {
                      backgroundColor:
                        UIDInvoice === product.UIDInvoice ? '#361675' : 'white',
                    },
                  ]}
                  key={index}>
                  <Text style={style.Number}>{product.Номер}</Text>
                  <View
                    style={{
                      height: '100%',
                      width: 1,
                      backgroundColor: 'blue',
                      marginRight: 10 * state.size,
                      marginLeft: 10 * state.size,
                    }}
                  />
                  <Text style={[style.Date, {textAlign: 'center'}]}>
                    {product.Дата.split(' ').join('\n')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          style={{
            flex: 1,
            marginTop: 80 * state.size,
            paddingTop: 10 * state.size,
            borderTopWidth: state.size,
            borderTopColor: 'grey',
          }}
          onScroll={(event) => {
            setPosition(event.nativeEvent.contentOffset.y);
          }}
          contentContainerStyle={{
            alignItems: 'flex-end',
            paddingBottom: (marginB != 'start' ? marginB : 0) + 50 * state.size,
          }}>
          <View style={style.header}>
            <Text
              style={{
                textAlign: 'center',
                width: 420 * state.size,
                paddingLeft: 20 * state.size,
                paddingRight: 20 * state.size,
                fontSize: 32 * state.size,
                fontWeight: 'bold',
              }}>
              Бар код
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 420 * state.size,
                paddingLeft: 20 * state.size,
                paddingRight: 20 * state.size,
                fontSize: 32 * state.size,
                fontWeight: 'bold',
              }}>
              Наименование
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 240 * state.size,
                paddingLeft: 20 * state.size,
                paddingRight: 20 * state.size,
                fontSize: 32 * state.size,
                fontWeight: 'bold',
              }}>
              Количество
            </Text>
          </View>
          {state.writeoff.map((i, index) => (
            <Create
              size={state.size}
              index={index}
              key={String(i.barCode) + state.writeoff.length + index}
            />
          ))}
          <TouchableOpacity onPress={() => dispatch(addWriteOffAC())}>
            <Image
              style={{
                width: 80 * state.size,
                height: 80 * state.size,
                marginTop: 30 * state.size,
                marginRight: 250 * state.size,
              }}
              source={require('../../assets/icons/plus.png')}
            />
          </TouchableOpacity>
          {state.writeoff.length > 0 &&
            !state.writeoff.find((p) => p.UIDProduct === '') && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(writeoff());
                    dispatch(setIsCreateWriteOffAC(false));
                    dispatch(removeAllWriteOffAC());
                  }}
                  style={[
                    gStyle.shadow,
                    {
                      width: 280 * state.size,
                      height: 70 * state.size,
                      backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Готово
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
      )}
    </View>
  );
});

const styles = (size) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20 * size,
      paddingLeft: 40 * size,
      paddingTop: 40 * size,
    },
    header: {
      width: '100%',
      height: 70 * size,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 50 * size,
      paddingLeft: 40 * size,
      paddingRight: 180 * size,
      borderTopColor: 'rgba(51, 42, 124, 1)',
      borderBottomColor: 'rgba(51, 42, 124, 1)',
      borderTopWidth: 2 * size,
      borderBottomWidth: 2 * size,
    },
    content: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    content1: {
      width: 950 * size,
    },
    overheadContainer: {
      width: 450 * size,
      height: '100%',
    },
    overHeadText: {
      width: '100%',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      padding: 10 * size,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 471 * size,
      height: 100 * size,
      marginBottom: 50 * size,
    },
    addText: {
      width: 100 * size,
      height: 100 * size,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(51, 42, 124, 1)',
      borderRadius: 25 * size,
    },
    Number: {fontSize: 23 * size, fontWeight: 'bold'},
    Date: {
      fontSize: 23 * size,
      fontWeight: 'bold',
    },
    writeOffContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 420 * size,
      height: 70 * size,
      borderRadius: 25 * size,
      borderWidth: 2 * size,
      borderColor: '#332A7C',
      marginTop: 10 * size,
      paddingLeft: 15 * size,
    },
  });
