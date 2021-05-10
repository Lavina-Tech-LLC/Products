import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListProducts,
  removeWriteOffAC,
  setIndexhAC,
  setScanerAC,
  updateWriteOffAC,
} from '../../Redux/MainReducer';
import GlobalStyles from '../../styles/GlobalStyles';

export default ({size, index}) => {
  const state = useSelector((state) => state.RemainderState);
  const main = useSelector((state) => state.mainState);
  const dispatch = useDispatch();

  const [UIDProduct, setUIDProduct] = useState(main.writeoff[index].UIDProduct);
  const [bc, setBc] = useState(main.writeoff[index].bc);
  const [name, setName] = useState(main.writeoff[index].name);
  const [amount, setAmount] = useState(main.writeoff[index].amount);
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(main.writeoff[index].disable);
  const [showName, setShowName] = useState(false);
  useEffect(() => {
    dispatch(getListProducts());
  }, []);
  useEffect(() => {
    (main.writeoff[index].bc !== bc ||
      main.writeoff[index].name !== name ||
      main.writeoff[index].amount !== amount) &&
      dispatch(
        updateWriteOffAC({
          index,
          data: {
            bc,
            UIDProduct,
            name,
            amount,
            disable,
          },
        }),
      );
  }, [name, bc, amount, disable, UIDProduct]);

  const gStyle = GlobalStyles(size);
  const style = styles(size, index);
  return (
    <View style={style.container}>
      <View style={style.barcodeContainer}>
        <View style={[gStyle.shadow, style.barcodeSearchContainer]}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setIndexhAC(index));
              !disable && dispatch(setScanerAC(true));
            }}>
            <Image
              source={require('../../assets/icons/barcodeScaner.png')}
              style={{width: 35 * size, height: 45 * size}}
            />
          </TouchableOpacity>
          <TextInput
            disableFullscreenUI={true}
            value={String(bc)}
            editable={!disable}
            onChangeText={(t) => setBc(t)}
            onFocus={() => {
              setShow(true);
              dispatch(setIndexhAC(index));
            }}
            textAlign="left"
            style={[
              style.textInput,
              {fontSize: (String(bc).length > 8 ? 28 : 40) * size},
            ]}
            keyboardType="number-pad"
          />
          {bc && !disable ? (
            <TouchableOpacity
              onPress={() => {
                setBc('');
                dispatch(setIndexhAC(index));
              }}>
              <Text style={{fontSize: 35 * size}}>✕</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(setIndexhAC(index));
              setShow((prev) => !prev);
            }}>
            <Text>{show && !disable ? '△' : '▽'}</Text>
          </TouchableOpacity>
        </View>
        {show && !disable && index === main.index ? (
          <ScrollView
            nestedScrollEnabled={true}
            style={[gStyle.shadow, style.barCodeListContainer]}
            contentContainerStyle={{paddingBottom: 20 * size}}>
            {main.products
              .filter((i) => String(i.Barcode).includes(String(bc)))
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setBc(item.Barcode);
                    setName(item.Name);
                    setUIDProduct(item.UIDProduct);
                    setDisable(true);
                    setShow(false);
                    setShowName(false);
                  }}>
                  <Text>{item.Barcode}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : (
          <View />
        )}
      </View>

      <View style={style.barcodeContainer}>
        <View style={[gStyle.shadow, style.barcodeSearchContainer]}>
          <TextInput
            disableFullscreenUI={true}
            value={`${name}`}
            editable={!disable}
            onChangeText={(t) => setName(t)}
            onFocus={() => {
              dispatch(setIndexhAC(index));
              setShowName(true);
            }}
            textAlign="left"
            style={[
              style.textInput,
              {fontSize: (name.length > 8 ? 28 : 40) * size},
            ]}
          />
          {name && !disable ? (
            <TouchableOpacity
              onPress={() => {
                setName('');
                dispatch(setIndexhAC(index));
              }}>
              <Text style={{fontSize: 35 * size}}>✕</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(setIndexhAC(index));
              setShowName((prev) => !prev);
            }}>
            <Text>{showName && !disable ? '△' : '▽'}</Text>
          </TouchableOpacity>
        </View>
        {showName && !disable && index === main.index ? (
          <ScrollView
            nestedScrollEnabled={true}
            style={[gStyle.shadow, style.barCodeListContainer]}
            contentContainerStyle={{paddingBottom: 20 * size}}>
            {main.products
              .filter((i) =>
                String(i.Name)
                  .toLowerCase()
                  .includes(String(name).toLowerCase()),
              )
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setBc(item.Barcode);
                    setName(item.Name);
                    setUIDProduct(item.UIDProduct);
                    setDisable(true);
                    setShow(false);
                    setShowName(false);
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      borderBottomColor: 'grey',
                      borderBottomWidth: 2 * state.size,
                      marginBottom: 2 * state.size,
                    }}>
                    {item.Name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : (
          <View />
        )}
      </View>

      <View style={style.barcodeContainer}>
        <View
          style={[
            gStyle.shadow,
            style.barcodeSearchContainer,
            {width: 200 * size},
          ]}>
          <Text style={{marginRight: 20 * size}}>☰</Text>
          <TextInput
            disableFullscreenUI={true}
            value={String(amount)}
            onChangeText={(t) => setAmount(t)}
            onFocus={() => {
              dispatch(setIndexhAC(index));
            }}
            textAlign="left"
            style={style.textInput}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeWriteOffAC(index))}>
        <Image
          style={{
            width: 40 * state.size,
            height: 40 * state.size,
            marginTop: 20 * size,
            marginRight: 50 * state.size,
          }}
          source={require('../../assets/icons/remove.webp')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = (size, index) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 30 * size,
      paddingLeft: 40 * size,
      paddingRight: 40 * size,
    },
    barCodeContainer: {
      flex: 1,
    },
    barcodeSearchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 420 * size,
      height: 80 * size,
      paddingLeft: 20 * size,
      paddingRight: 20 * size,
      marginRight: 25 * size,
      zIndex: index,
    },
    barCodeListContainer: {
      width: 420 * size,
      height: 200 * size,
      top: 0,
      marginTop: 10 * size,
      padding: 18 * size,
      position: 'relative',
      borderColor: 'red',
      zIndex: index,
    },
    textInput: {
      width: 240 * size,
      borderWidth: 0,
      padding: 0,
    },
    clear: {},
    openClose: {},
    hide: {
      display: 'none',
    },
  });
