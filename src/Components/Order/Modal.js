import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {modalStyles} from './Styles';
import GlobalStyles from '../../styles/GlobalStyles';
import {styles} from '../Coming/ComingStyle';
import {
  getListProducts,
  setScanerAC,
  setSearchAC,
} from '../../Redux/MainReducer';
import Card from '../../AuxiliaryComponents/Card';
import {addWarehouseList, deleteWarehouseList} from '../../Redux/OrderReducer';

export default React.memo(({args: {modalVisible, setModalVisible}}) => {
  const order = useSelector((state) => state.OrderState);
  const state = useSelector((state) => state.mainState);
  const rem = useSelector((state) => state.RemainderState);
  const [marginB, setMarginB] = useState(10 * state.size);
  const [addList, setAddList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [rendering, setRendering] = useState(0);
  const dispatch = useDispatch();
  const style = modalStyles(order.size);
  const gStyle = GlobalStyles(order.size);

  useEffect(() => {
    dispatch(getListProducts());
    setOrderList(order.products);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setMarginB(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setMarginB(10 * state.size),
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    setOrderList(order.products);
    setAddList([]);
    setAddList([]);
  }, [modalVisible]);

  const keyExtractor = useCallback(
    (item, index) => {
      return index + String(orderList.length);
    },
    [rendering, orderList],
  );

  const render = useCallback(
    (props) => {
      return (
        <Cards
          {...props}
          setAddList={setAddList}
          setDeleteList={setDeleteList}
          setOrderList={setOrderList}
          rem={rem}
          orderList={orderList}
          setRendering={setRendering}
        />
      );
    },
    [rendering, orderList],
  );

  return state.loading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={style.container}>
        <View style={[gStyle.shadow, style.modalCard]}>
          <View style={style.headerContainer}>
            <Text></Text>
            <Text style={style.headerText}>Избранные</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                style={{
                  width: 30 * state.size,
                  height: 30 * state.size,

                  marginRight: 20 * state.size,
                }}
                source={require('../../assets/icons/remove.webp')}
              />
            </TouchableOpacity>
          </View>
          <View style={style.searchContainer}>
            <View style={[styles(order.size).barCode, {marginBottom: marginB}]}>
              <TextInput
                keyboardType="numeric"
                value={String(state.search)}
                onChangeText={(text) => dispatch(setSearchAC(text))}
                disableFullscreenUI={true}
                placeholder="Штрих код"
                editable
                style={styles(order.size).input}
              />
              <TouchableOpacity
                onPress={() => dispatch(setScanerAC(true))}
                style={styles(order.size).barCodeButton}>
                <Image
                  source={require('../../assets/icons/barcodeScaner.png')}
                  style={{
                    width: 25 * order.size,
                    height: 25 * order.size,
                  }}></Image>
              </TouchableOpacity>
            </View>
          </View>
          {/* cards */}

          {state.products.length > 0 && (
            <FlatList
              extraData={rendering}
              numColumns={3}
              keyExtractor={keyExtractor}
              data={state.products.sort((a) => {
                const isOnList = orderList.find((item2) => {
                  return item2?.Name === a.Name;
                });
                return isOnList ? 1 : 0;
              })}
              contentContainerStyle={style.productsContainer}
              renderItem={render}
            />
          )}
          <View
            style={{
              width: '100%',
              marginTop: 15 * state.size,
              paddingTop: 20 * state.size,
              marginBottom: 15 * state.size,
              alignItems: 'center',
              borderTopColor: 'grey',
              borderTopWidth: 2 * state.size,
              borderRadius: 25 * state.size,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(addWarehouseList(addList));
                dispatch(deleteWarehouseList(deleteList, setModalVisible));
              }}
              style={{
                width: 280 * state.size,
                height: 65 * state.size,
                borderRadius: 25 * state.size,
                borderColor: 'blue',
                borderWidth: 3 * state.size,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const Cards = React.memo(
  ({
    item,
    index,
    setDeleteList,
    setAddList,
    orderList,
    setOrderList,
    rem,
    setRendering,
  }) => {
    const isOnList = orderList.find((item2) => {
      return item2?.UIDProduct === item.UIDProduct;
    });
    return (
      <Card
        index={index}
        key={isOnList + index}
        item={item || addList.includes(item.UIDProduct)}
        star={isOnList}
        onClickCard={() => {
          if (isOnList) {
            setDeleteList((prev) => [...prev, item.UIDProduct]);
            setAddList((prev) => {
              prev.splice(prev.indexOf(item.UIDProduct), 1);
              return prev;
            });
            setOrderList((prev) => {
              let ind;
              prev.forEach((p, i) => {
                if (p.UIDProduct === item.UIDProduct) {
                  ind = i;
                }
              });
              prev.splice(ind, 1);
              return prev;
            });
          } else {
            setAddList((prev) => [...prev, item.UIDProduct]);
            setDeleteList((prev) => {
              prev.splice(prev.indexOf(item.UIDProduct), 1);
              return prev;
            });
            setOrderList((prev) => [...prev, item]);
          }
          setRendering((prev) => ++prev);
        }}
        selected={false}
        state={rem}
      />
    );
  },
);
