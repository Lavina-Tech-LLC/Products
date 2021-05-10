// <<<<<< IMPORTS >>>>>>
import {Alert, Dimensions, ToastAndroid} from 'react-native';
import api from '../API/api';
import {getDate, summa} from '../Utils/helpers';

//   <<<<<< types >>>>>>
const SET_TYPES = 'RemainderReducer/SET_TYPES';
const SET_CALCVAR = 'RemainderReducer/SET_CALCVAR';
const SET_TYPE = 'RemainderReducer/SET_TYPE';
const SET_ZONES = 'RemainderReducer/SET_ZONES';
const SET_ZONE = 'RemainderReducer/SET_ZONE';
const SET_PRODUCTS = 'RemainderReducer/SET_PRODUCTS';
const SET_PRODUCT = 'RemainderReducer/SET_PRODUCT';
const SET_LOADER = 'RemainderReducer/SET_LOADER';
const CHANGE_AMOUNT = 'RemainderReducer/CHANGE_AMOUNT';
const SET_INVENTORY_UID = 'RemainderReducer/SET_INVENTORY_UID';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  calcVar: '',
  loader: false,
  types: ['Принять', 'Сдать', 'Переучет'],
  type: '',
  zones: [
    'Стеллаж 1',
    'Стеллаж 2',
    'Стеллаж 3',
    'Стеллаж 4',
    'Стеллаж 5',
    'Стеллаж 7',
    'Стеллаж 8',
  ],
  zone: '',
  products: [],
  product: '',
  UIDInventory: null,
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {...state, types: action.payload};
    case SET_CALCVAR:
      return {...state, calcVar: action.payload};
    case SET_TYPE:
      return {...state, type: action.payload};
    case SET_INVENTORY_UID:
      return {...state, UIDInventory: action.payload};
    case CHANGE_AMOUNT:
      const prd = state.products.map((p) => {
        if (state.product && p.UIDProduct === state.product.UIDProduct) {
          p.amountfact = action.payload;
        }
        return p;
      });
      return {...state, products: prd};
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_PRODUCT:
      return {...state, product: action.payload};
    case SET_ZONES:
      return {...state, zones: action.payload};
    case SET_ZONE:
      return {...state, zone: action.payload};
    case SET_LOADER:
      return {...state, loader: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setTypesAC = (payload) => ({type: SET_TYPES, payload});
export const changeAmountAC = (payload) => ({type: CHANGE_AMOUNT, payload});
export const setCalcVarAC = (payload) => ({type: SET_CALCVAR, payload});
export const setTypeAC = (payload) => ({type: SET_TYPE, payload});
export const setInventoryUidAC = (payload) => ({
  type: SET_INVENTORY_UID,
  payload,
});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setProductAC = (payload) => ({type: SET_PRODUCT, payload});
export const setZonesAC = (payload) => ({type: SET_ZONES, payload});
export const setZoneAC = (payload) => ({type: SET_ZONE, payload});
export const setLoaderAC = (payload) => ({type: SET_LOADER, payload});

// <<<<<< THUNKS >>>>>>
export const getProducts = () => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  const {type} = getState().RemainderState;
  dispatch(setLoaderAC(true));
  const getUrl = () => {
    switch (type) {
      case 'Принять':
        return `lastinventory?UIDStructure=${UIDStructure}&date=${getDate()}`;
      case 'Сдать':
        return `listproducts/${UIDStructure}`;

      default:
        return '';
    }
  };
  api(getUrl(), 'GET', token)
    .then((res) => {
      dispatch(setProductsAC(res));
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};

export const lastInventoryDone = (inventoryID) => (dispatch, getState) => {
  dispatch(setLoaderAC(true));
  const {token, UIDStructure} = getState().UserState;
  const {products, type} = getState().RemainderState;

  const body = {
    date: getDate(),
    UIDInventory: type === 'Принять' ? null : inventoryID,
    UIDStructure,
    Products: products.map((product) => ({
      UIDProduct: product.UIDProduct,
      amountrecord: product.Amount,
      amountfact:
        product.amountfact || String(summa(product.amountfact)) === String(0)
          ? summa(product.amountfact)
          : product.Amount,
    })),
  };
  api('lastinventorydone', 'POST', token, body)
    .then(() => {
      dispatch(setLoaderAC(false));
      ToastAndroid.show('✔️', ToastAndroid.SHORT);
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};

export const changeInventory = () => (dispatch, getState) => {
  dispatch(setLoaderAC(true));
  const {token, UIDStructure} = getState().UserState;
  const {UIDInventory, products} = getState().RemainderState;

  const body = {
    date: getDate(),
    UIDInventory: null,
    UIDStructure,
    Products: products.map((product) => ({
      UIDProduct: product.UIDProduct,
      amountrecord: product.Amount,
      amountfact:
        product.amountfact || String(summa(product.amountfact)) === String(0)
          ? summa(product.amountfact)
          : product.Amount,
    })),
  };

  api('changeInventory', 'POST', token, body)
    .then(() => {
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};

export const getInventoryUid = () => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api(
    `getinventoryuid?UIDStructure=${UIDStructure}&Type=passOff&date=${getDate()}`,
    'GET',
    token,
  )
    .then((res) => {
      dispatch(setInventoryUidAC(res));
      dispatch(lastInventoryDone(res));
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};
