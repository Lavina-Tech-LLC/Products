//   <<<<<< types >>>>>>
const SET_PATH = 'MainReducer/SET_PATH';
const SET_SEARCH = 'MainReducer/SET_SEARCH';
const SET_INDEX = 'MainReducer/SET_INDEX';
const SET_SCANER = 'MainReducer/SET_SCANER';
const CHANGE_PATH = 'MainReducer/CHANGE_PATH';
const SET_PARAMS = 'MainReducer/SET_PARAMS';
const SET_LOADING = 'MainReducer/SET_LOADING';
const SET_CATEGORY = 'MainReducer/SET_CATEGORY';
const SET_SHOWMENU = 'MainReducer/SET_SHOWMENU';
const UPDATE_WRITEOFF = 'MainReducer/UPDATE_WRITEOFF';
const ADD_WRITEOFF = 'MainReducer/ADD_WRITEOFF';
const REMOVE_WRITEOFF = 'MainReducer/REMOVE_WRITEOFF';
const REMOVEALL_WRITEOFF = 'MainReducer/REMOVEALL_WRITEOFF';
const ISCREATE_WRITEOFF = 'MainReducer/ISCREATE_WRITEOFF';
const SET_OVERHEAD_WRITEOFF = 'MainReducer/SET_OVERHEAD_WRITEOFF';
const SET_WRITEOFF_INFO = 'MainReducer/SET_WRITEOFF_INFO';
const SET_LIST_PRODUCTS = 'MainReducer/SET_LIST_PRODUCTS';

// <<<<<< IMPORTS >>>>>>
import {Dimensions} from 'react-native';
import api from '../API/api';
import {getDate} from '../Utils/helpers';
// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  search: '',
  //for Create.js
  index: 0,
  isCreate: false,
  scaner: false,
  writeoff: [{UIDProduct: '', bc: '', name: '', amount: 0, disable: false}],
  overheadWriteOff: [],
  writeOffInfo: [],
  navigation: {path: '', history: []},
  loading: false,
  params: '',
  categories: ['Остаток', 'Приход', 'Списание', 'Баланс', 'Заказ'],
  category: 'Остаток',
  showMenu: true,
  products: [],
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        navigation: {
          path: action.payload,
          history: [...state.navigation.history, state.navigation.path],
        },
      };
    case CHANGE_PATH:
      return {
        ...state,
        navigation: {
          path: action.payload,
          history: [...state.navigation.history, state.navigation.path],
        },
      };
    case SET_PARAMS:
      return {...state, params: action.payload};
    case SET_LIST_PRODUCTS:
      return {...state, products: action.payload};
    case SET_OVERHEAD_WRITEOFF:
      return {...state, overheadWriteOff: action.payload};
    case SET_WRITEOFF_INFO:
      return {...state, writeOffInfo: action.payload};
    case ISCREATE_WRITEOFF:
      return {...state, isCreate: action.payload};
    case ADD_WRITEOFF:
      return {
        ...state,
        writeoff: [
          ...state.writeoff,
          {UIDProduct: '', bc: '', name: '', amount: 0, disable: false},
        ],
      };
    case UPDATE_WRITEOFF:
      const newData = [...state.writeoff];
      newData[action.payload.index] = action.payload.data;
      return {...state, writeoff: newData};
    case REMOVE_WRITEOFF:
      const newData2 = [...state.writeoff];
      newData2.splice(action.payload, 1);
      return {...state, writeoff: newData2};
    case SET_SEARCH:
      return {...state, search: action.payload};
    case REMOVEALL_WRITEOFF:
      return {
        ...state,
        writeoff: [
          {UIDProduct: '', bc: '', name: '', amount: 0, disable: false},
        ],
      };
    case SET_SCANER:
      return {...state, scaner: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
    case SET_INDEX:
      return {...state, index: action.payload};
    case SET_SHOWMENU:
      return {...state, showMenu: !state.showMenu};
    case SET_CATEGORY:
      return {...state, category: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});
export const setListProductsAC = (payload) => ({
  type: SET_LIST_PRODUCTS,
  payload,
});
export const addWriteOffAC = () => ({type: ADD_WRITEOFF});
export const updateWriteOffAC = (payload) => ({type: UPDATE_WRITEOFF, payload});
export const setOverheadWriteOffAC = (payload) => ({
  type: SET_OVERHEAD_WRITEOFF,
  payload,
});
export const setWriteOffInfoAC = (payload) => ({
  type: SET_WRITEOFF_INFO,
  payload,
});
export const removeWriteOffAC = (payload) => ({type: REMOVE_WRITEOFF, payload});
export const setIsCreateWriteOffAC = (payload) => ({
  type: ISCREATE_WRITEOFF,
  payload,
});
export const removeAllWriteOffAC = () => ({type: REMOVEALL_WRITEOFF});
export const setIndexhAC = (payload) => ({type: SET_INDEX, payload});
export const setSearchAC = (payload) => ({type: SET_SEARCH, payload});
export const setScanerAC = (payload) => ({type: SET_SCANER, payload});
export const setParamsAC = (payload) => ({type: SET_PARAMS, payload});
export const setLoadingAC = (payload) => ({type: SET_LOADING, payload});
export const setCategoryAC = (payload) => ({type: SET_CATEGORY, payload});
export const setShowMenuAC = () => ({type: SET_SHOWMENU});

// <<<<<< THUNKS >>>>>>
export const getOverheadWriteOff = () => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api(
    `listwriteoff?UIDStructure=${UIDStructure}&date=${getDate()}`,
    'GET',
    token,
  )
    .then((res) => {
      dispatch(setOverheadWriteOffAC(res));
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getWriteOffInfo = (UIDInvoice) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api(`writeoffinfo/${UIDInvoice}`, 'GET', token)
    .then((res) => {
      dispatch(setWriteOffInfoAC(res));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getListProducts = () => (dispatch, getState) => {
  dispatch(setLoadingAC(true));
  const {token, UIDStructure} = getState().UserState;
  api(`listproducts/${UIDStructure}`, 'GET', token)
    .then((res) => {
      dispatch(setListProductsAC(res));
      dispatch(setLoadingAC(false));
    })
    .catch((e) => {
      console.log(e);
      dispatch(setLoadingAC(false));
    });
};

export const writeoff = (UIDInvoice) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  const state = getState().mainState.writeoff;
  const body = {
    UIDstructure: UIDStructure,
    Products: state.map((p) => ({UIDProduct: p.UIDProduct, Amount: p.amount})),
  };
  api('writeoff', 'POST', token, body)
    .then(() => {
      dispatch(getOverheadWriteOff());
    })
    .catch((e) => {
      console.log(e);
    });
};
