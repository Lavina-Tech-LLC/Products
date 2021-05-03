import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GlobalStyles from '../../../styles/GlobalStyles';
import {setSearchAC, setScanerAC} from '../../../Redux/MainReducer';
import {
  changeInventory,
  getInventoryUid,
  getProducts,
  lastInventoryDone,
  setProductAC,
  setProductsAC,
  setTypeAC,
  setZoneAC,
} from '../../../Redux/RemainderReducer';
import Card from '../../../AuxiliaryComponents/Card';

export default React.memo(() => {
  const {search} = useSelector((state) => state.mainState);
  const state = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const gStyle = GlobalStyles(state.size);
  const style = styles(state.size);
  useEffect(() => {
    state.type === 'Сдать' && dispatch(getInventoryUid());
    state.products.length < 1 && dispatch(getProducts());
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20 * state.size,
        paddingBottom: 80 * state.size,
      }}
      style={style.container}>
      <View style={style.productCreatorContaier}>
        <View style={[style.barCode]}>
          <TextInput
            keyboardType="numeric"
            value={String(search)}
            onChangeText={(text) => dispatch(setSearchAC(text))}
            disableFullscreenUI={true}
            placeholder="Штрих код"
            editable
            style={style.input}
          />
          <TouchableOpacity
            onPress={() => dispatch(setScanerAC(true))}
            style={style.barCodeButton}>
            <Image
              source={require('../../../assets/icons/barcodeScaner.png')}
              style={{width: 25 * state.size, height: 25 * state.size}}></Image>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={[gStyle.shadow, style.button]}>
          <Text style={style.buttonText1}>+</Text>
          <Text style={style.buttonText2}>Добавить ингредиент</Text>
        </TouchableOpacity> */}
      </View>
      {state.loader ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={style.productsContainer}>
          {state.products
            .filter((item) => String(item.Barсode).includes(String(search)))
            .map((item, index) => (
              <Card
                key={index}
                index={index}
                item={item}
                onClickCard={() => {
                  dispatch(setProductAC(item));
                }}
                color={
                  item.amountfact
                    ? item.amountfact === item.Amount
                      ? '#d7fab9'
                      : '#fab9bb'
                    : ''
                }
                state={state}
              />
            ))}
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          state.type === 'Принять' && dispatch(changeInventory());
          dispatch(lastInventoryDone());
          dispatch(setProductsAC([]));
          dispatch(setTypeAC(''));
          dispatch(setZoneAC(''));
        }}
        style={{
          borderWidth: 4 * state.size,
          borderColor: '#261b6e',
          borderRadius: 35 * state.size,
          alignItems: 'center',
          justifyContent: 'center',
          width: 400 * state.size,
          height: 80 * state.size,
          margin: 30 * state.size,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 35 * state.size}}>
          Отправить
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
});

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
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      width: 351 * size,
      height: 80 * size,
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
    barCode: {
      width: 371 * size,
      height: 80 * size,
      borderRadius: 25 * size,
      borderWidth: 1,
      borderColor: 'rgba(51, 42, 124, 1)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 30 * size,
    },
    barCodeButton: {
      width: 80 * size,
      height: 80 * size,
      position: 'relative',
      top: -3.5 * size,
      right: -4 * size,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'rgba(51, 42, 124, 1)',
      borderWidth: 20 * size,
      borderRadius: 25 * size,
    },

    input: {
      fontSize: 27 * size,
      flex: 1,
      padding: 0,
      paddingLeft: 5,
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
    iconText: {
      fontSize: 24 * size,
    },
  });
