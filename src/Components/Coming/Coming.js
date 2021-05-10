import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setScanerAC} from '../../Redux/MainReducer';
import {
  changeAmountAC,
  getListDoneInvoice,
  getProducts,
  invoice,
  setInvoiceAC,
  setProductAC,
  setSearchComingAC,
  synchStockWarehouse,
} from '../../Redux/ComingReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import {styles} from './ComingStyle';
import InvoiceCard from '../../AuxiliaryComponents/InvoiceCard';
import Card from '../../AuxiliaryComponents/Card';
import Calculator from '../../AuxiliaryComponents/Calculator';
import {summa} from '../../Utils/helpers';

export default React.memo(() => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ComingState);
  const style = styles(state.size);
  const gStyle = GlobalStyles(state.size);
  const [load, setLoad] = useState(false);
  const [y, setY] = useState(0);
  const [position, setPosition] = useState(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    dispatch(getListDoneInvoice(''));
    dispatch(getListDoneInvoice('done'));
  }, []);

  return state.product ? (
    <Calculator
      state={state}
      done={(amount) => {
        dispatch(changeAmountAC(amount));
        dispatch(setProductAC(''));
        setTimeout(() => {
          if (scrollRef?.current) scrollRef.current.scrollTo({y: position});
        }, 300);
      }}
    />
  ) : (
    <View style={style.constainer}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 50 * state.size,
        }}>
        {load ? (
          <ActivityIndicator color="green" size="small" />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setLoad(true);
              dispatch(synchStockWarehouse(() => setLoad(false)));
            }}>
            <Image
              source={require('../../assets/icons/sync.png')}
              style={{width: 60 * state.size, height: 60 * state.size}}
            />
          </TouchableOpacity>
        )}
        <View style={[style.barCode]}>
          <TextInput
            keyboardType="numeric"
            value={String(state.search)}
            onChangeText={(text) => dispatch(setSearchComingAC(text))}
            disableFullscreenUI={true}
            placeholder="Штрих код"
            editable
            style={style.input}
          />
          <TouchableOpacity
            onPress={() => dispatch(setScanerAC(true))}
            style={style.barCodeButton}>
            <Image
              source={require('../../assets/icons/barcodeScaner.png')}
              style={{width: 25 * state.size, height: 25 * state.size}}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.content}>
        <View style={[gStyle.shadow, style.overheadContainer]}>
          <View style={style.overHeadText}>
            <Text
              style={{
                fontSize: 24 * state.size,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {'Накладные \n(для прихода)'}
            </Text>
          </View>
          <InvoiceCard
            state={state}
            onClick={(uid) => {
              if (state.products.length > 0)
                Alert.alert(
                  'вы действительно хотите изменить накладные? ',
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
                        dispatch(getProducts('', uid));
                        dispatch(setInvoiceAC({done: false, UIDInvoice: uid}));
                        if (scrollRef?.current)
                          scrollRef.current.scrollTo({y: 0});
                      },
                    },
                  ],
                );
              else {
                dispatch(getProducts('', uid));
                dispatch(setInvoiceAC({done: false, UIDInvoice: uid}));
                if (scrollRef?.current) scrollRef.current.scrollTo({y: 0});
              }
            }}
            size={state.size}
            style={style}
            listInvoice={state.listInvoice}
          />
        </View>

        <View style={[gStyle.shadow, style.productContainer]}>
          {state.products.length > 0 ? (
            <ScrollView
              ref={scrollRef}
              onScroll={(event) => {
                setY(event.nativeEvent.contentOffset.y);
              }}
              style={{flex: 1}}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {state.products
                .filter((item) =>
                  String(item.Barcode).includes(String(state.search)),
                )
                .map((item, index) => (
                  <Card
                    key={index}
                    index={index}
                    item={item}
                    color={
                      item.amountfact || String(summa(item.amountfact)) === '0'
                        ? summa(item.amountfact) === item.Amount
                          ? '#d7fab9'
                          : '#fab9bb'
                        : 'rgba(248, 248, 252, 1)'
                    }
                    onClickCard={
                      !state.invoice.done
                        ? () => {
                            setPosition(y);
                            dispatch(setProductAC(item));
                          }
                        : undefined
                    }
                    state={state}
                    size={{
                      width: 350 * state.size,
                      height: 270 * state.size,
                    }}
                    otherStyle={
                      state.invoice &&
                      state.invoice.done &&
                      item.Amount !== item.AmountDone
                        ? {borderColor: 'red', borderWidth: 2 * state.size}
                        : {}
                    }
                  />
                ))}
              {state.invoice && !state.invoice.done ? (
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        !state.products.find(
                          (product) => product.amountfact === undefined,
                        )
                      ) {
                        dispatch(invoice());
                        dispatch(setInvoiceAC({done: false, UIDInvoice: ''}));
                      } else
                        ToastAndroid.show(
                          'Не все продукты в накладной были проверены',
                          ToastAndroid.SHORT,
                        );
                    }}
                    style={{
                      width: 350 * state.size,
                      height: 90 * state.size,
                      margin: 35 * state.size,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#050069',
                      borderWidth: 4 * state.size,
                      borderRadius: 25 * state.size,
                    }}>
                    <Text>Отправить</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </ScrollView>
          ) : (
            <View />
          )}
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
          <InvoiceCard
            state={state}
            onClick={(uid) => {
              if (state.products.length > 0)
                Alert.alert(
                  'вы действительно хотите изменить накладные? ',
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
                        dispatch(getProducts('done', uid));
                        dispatch(setInvoiceAC({done: true, UIDInvoice: uid}));
                        if (scrollRef?.current)
                          scrollRef.current.scrollTo({y: 0});
                      },
                    },
                  ],
                );
              else {
                dispatch(getProducts('done', uid));
                dispatch(setInvoiceAC({done: true, UIDInvoice: uid}));
                if (scrollRef?.current) scrollRef.current.scrollTo({y: 0});
              }
            }}
            size={state.size}
            style={style}
            listInvoice={state.listDoneInvoice}
          />
        </View>
      </View>
    </View>
  );
});
