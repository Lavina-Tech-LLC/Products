import React, {useEffect} from 'react';
import {
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
} from '../../Redux/ComingReducer';
import GlobalStyles from '../../styles/GlobalStyles';
import {styles} from './ComingStyle';
import InvoiceCard from '../../AuxiliaryComponents/InvoiceCard';
import Card from '../../AuxiliaryComponents/Card';
import Calculator from '../../AuxiliaryComponents/Calculator';

export default React.memo(() => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ComingState);
  const style = styles(state.size);
  const gStyle = GlobalStyles(state.size);

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
      }}
    />
  ) : (
    <View style={style.constainer}>
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
              dispatch(getProducts('', uid));
              dispatch(setInvoiceAC({done: false, UIDInvoice: uid}));
            }}
            size={state.size}
            style={style}
            listInvoice={state.listInvoice}
          />
        </View>

        <View style={[gStyle.shadow, style.productContainer]}>
          {state.products.length > 0 ? (
            <ScrollView
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
                      item.amountfact || String(item.amountfact) === '0'
                        ? item.amountfact === item.Amount
                          ? '#d7fab9'
                          : '#fab9bb'
                        : 'rgba(248, 248, 252, 1)'
                    }
                    onClickCard={
                      !state.invoice.done
                        ? () => {
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
              dispatch(getProducts('done', uid));
              dispatch(setInvoiceAC({done: true, UIDInvoice: uid}));
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
