//   <<<<<< types >>>>>>
const SET_PATH = 'Balance/SET_PATH';
const SET_PRODUCTS = 'Balance/SET_PRODUCTS';
const SET_NOMENCLATURES = 'Balance/SET_NOMENCLATURES';
const SET_LOADER = 'Balance/SET_LOADER';
const SET_LIST_PRODUCTS = 'Balance/SET_LIST_PRODUCTS';
const CHANGE_NOMENCLATURE = 'Balance/CHANGE_NOMENCLATURE';
const REMOVE_LIST_PRODUCTS = 'Balance/REMOVE_LIST_PRODUCTS';

// <<<<<< IMPORTS >>>>>>
import {Dimensions, ToastAndroid} from 'react-native';
import api from '../API/api';
import {getDate} from '../Utils/helpers';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  products: [],
  nomenclatures: [],
  listProducts: [],
  loader: false,
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    // >>>
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    // >>>
    case SET_NOMENCLATURES:
      return {...state, nomenclatures: action.payload};

    // >>>
    case REMOVE_LIST_PRODUCTS:
      return {...state, listProducts: []};

    // >>>
    case SET_LIST_PRODUCTS: {
      const newList = state.listProducts.slice();
      const idn = newList.indexOf(action.payload);
      if (idn > -1) newList.splice(idn, 1);
      else newList.push(action.payload);
      return {...state, listProducts: newList};
    }

    // >>>
    case CHANGE_NOMENCLATURE: {
      const newList = state.nomenclatures.map((item) => {
        if (item.UIDProduct === action.payload) {
          item.ViewInBalance = !item.ViewInBalance;
        }
        return item;
      });
      return {...state, nomenclatures: newList};
    }
    // >>>
    case SET_LOADER:
      return {...state, loader: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});
export const removeListProductsAC = () => ({type: REMOVE_LIST_PRODUCTS});
export const changeNomenclatureAC = (payload) => ({
  type: CHANGE_NOMENCLATURE,
  payload,
});
export const setListProductsAC = (payload) => ({
  type: SET_LIST_PRODUCTS,
  payload,
});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setNomenclaturesAC = (payload) => ({
  type: SET_NOMENCLATURES,
  payload,
});
export const setLoaderAC = (payload) => ({type: SET_LOADER, payload});

// <<<<<< THUNKS >>>>>>

export const getProducts = (func) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  const {date} = getState().mainState;
  !func && dispatch(setLoaderAC(true));
  api(`balance/${UIDStructure}/${getDate(date)}`, 'GET', token)
    .then((res) => {
      dispatch(
        setProductsAC(
          res.map((product) => ({
            barCode: product.Barcode,
            name: product.Номенклатура,
            startRem: product.НачалоДня,
            coming: product.Приход,
            sale: product.Продажа,
            writeOff: product.Списание,
            remainder: product.Остаток,
            difAcc: product.РазницаПринята,
            others: product.Прочие,
            difference: product.Разница,
            price: product.Цена,
            amount: product.Сумма,
          })),
        ),
      );

      func ? func() : dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      console.log(e);
      dispatch(setLoaderAC(false));
      func ? func() : dispatch(setLoaderAC(false));
    });
};

export const getNomenclatures = () => (dispatch, getState) => {
  const {token} = getState().UserState;
  api('allproducts', 'GET', token).then((data) => {
    dispatch(setNomenclaturesAC(data));
  });
};

export const viewInBalance = (body, func) => (dispatch, getState) => {
  const {token} = getState().UserState;
  api('viewinbalance', 'POST', token, body)
    .then((data) => {
      if (data) {
        dispatch(removeListProductsAC());
        ToastAndroid.show('успешно сохранено', ToastAndroid.SHORT);
      }
      func && func();
    })
    .catch((e) => {
      console.log(e);
      func && func();
    });
};
