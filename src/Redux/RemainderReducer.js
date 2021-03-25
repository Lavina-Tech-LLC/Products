import {Dimensions} from 'react-native';

//   <<<<<< types >>>>>>
const SET_TYPES = 'RemainderReducer/SET_TYPES';
const SET_CALCVAR = 'RemainderReducer/SET_CALCVAR';
const SET_TYPE = 'RemainderReducer/SET_TYPE';
const SET_ZONES = 'RemainderReducer/SET_ZONES';
const SET_ZONE = 'RemainderReducer/SET_ZONE';
const SET_PRODUCTS = 'RemainderReducer/SET_PRODUCTS';
const SET_PRODUCT = 'RemainderReducer/SET_PRODUCT';

// <<<<<< IMPORTS >>>>>>

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  calcVar: '',
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
  zone: 'Стеллаж 1',
  products: [
    {
      UIDProduct: '120a2402-af94-11ea-9e54-502b73d5e1bd',
      Name: 'cc Кока кола 0.5',
      Barcode: 6542,
      Amount: 12,
    },
    {
      UIDProduct: '9e906055-af9d-11ea-9e54-502b73d5e1bd',
      Name: 'cc Кока кола 1.0',
      Barcode: 0,
      Amount: 1,
    },
    {
      UIDProduct: '25fc264e-f1c1-11ea-9e84-00d8614f18c9',
      Name: 'Сыр',
      Barcode: 67,
      Amount: 12,
    },
    {
      UIDProduct: 'e96ff160-f800-11ea-9e85-00d8614f18c9',
      Name: 'Печеньки',
      Barcode: 4605825003401,
      Amount: 3,
    },
  ],
  product: '',
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
    case SET_PRODUCTS:
      return {...state, productes: action.payload};
    case SET_PRODUCT:
      return {...state, product: action.payload};
    case SET_ZONES:
      return {...state, zones: action.payload};
    case SET_ZONE:
      return {...state, zone: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setTypesAC = (payload) => ({type: SET_TYPES, payload});
export const setCalcVarAC = (payload) => ({type: SET_CALCVAR, payload});
export const setTypeAC = (payload) => ({type: SET_TYPE, payload});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setProductAC = (payload) => ({type: SET_PRODUCT, payload});
export const setZonesAC = (payload) => ({type: SET_ZONES, payload});
export const setZoneAC = (payload) => ({type: SET_ZONE, payload});

// <<<<<< THUNKS >>>>>>
export const getProducts = () => (dispatch) => {};
export const getZones = () => (dispatch) => {};
