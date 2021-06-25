import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeNomenclatureAC,
  getNomenclatures,
  setListProductsAC,
  viewInBalance,
} from '../../Redux/BalanceReducer';
import {NomStyle} from './NomStyle';

export default () => {
  const state = useSelector((state) => state.BalanceState);
  const main = useSelector((state) => state.mainState);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [loader, setIsLoader] = useState(false);
  const [nom, setNom] = useState([]);
  useEffect(() => {
    dispatch(getNomenclatures());
  }, []);
  useEffect(() => {
    setNom(state.nomenclatures.sort((item) => (item.ViewInBalance ? -1 : 1)));
  }, [state.nomenclatures]);

  const styles = NomStyle(state.size);

  const keyExtractor = (item, index) =>
    index + item.UIDProduct + item.ViewInBalance;
  const render = (props) => {
    return <Nomenclatures {...props} styles={styles} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.SearchInputContainer}>
        <TextInput
          placeholder="Search..."
          disableFullscreenUI={true}
          style={styles.SearchInput}
          value={search}
          onChangeText={(text) => setSearch(String(text))}
        />
        <TouchableOpacity style={styles.clear} onPress={() => setSearch('')}>
          <Text>✖</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.content,
          {
            height:
              Dimensions.get('window').height -
              (main.showMenu ? 410 * state.size : 310 * state.size),
          },
        ]}>
        <FlatList
          contentContainerStyle={styles.NomenclaturesContainer}
          numColumns={2}
          extraData={state.listProducts.length + search}
          keyExtractor={keyExtractor}
          data={nom.filter(
            (item) =>
              item.Product.toLowerCase().includes(search.toLowerCase()) ||
              item.Barcode.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={render}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: `rgba(51, 42, 124,${
                state.listProducts.length ? '1' : '.4'
              })`,
            },
          ]}
          disabled={!state.listProducts.length}
          onPress={() => {
            setIsLoader(true);
            const body = {
              Products: state.listProducts.map((item) => ({UID: item})),
            };

            dispatch(viewInBalance(body, () => setIsLoader(false)));
          }}>
          <Text style={{color: 'white'}}>Cохранить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Nomenclatures = React.memo(({item, index, styles}) => {
  const dispatch = useDispatch();
  const Render = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          dispatch(changeNomenclatureAC(item.UIDProduct));
          dispatch(setListProductsAC(item.UIDProduct));
        }}
        style={[
          styles.Nomenclature,
          {backgroundColor: !item.ViewInBalance ? 'white' : '#332A7C'},
        ]}>
        <Text
          numberOfLines={1}
          style={[
            styles.NomName,
            {color: item.ViewInBalance ? 'white' : '#332A7C'},
          ]}>
          {item.Product}
        </Text>
        <Text style={{color: item.ViewInBalance ? 'white' : '#332A7C'}}>
          {item.ViewInBalance ? '✮' : '☆'}
        </Text>
      </TouchableOpacity>
    ),
    [item.UIDProduct + item.ViewInBalance],
  );
  return (
    <>
      <Render />
    </>
  );
});
