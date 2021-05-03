import {Dimensions, ToastAndroid} from 'react-native';
import {newList} from '../Utils/sort';
import api from '../API/api';

//   <<<<<< types >>>>>>
const SET_PRODUCTS = 'OrderReducer/SET_PRODUCTS';
const UPSORT = 'OrderReducer/UPSORT';
const DOWNSORT = 'OrderReducer/DOWNSORT';
const DELETEELEMENT = 'OrderReducer/DELETEELEMENT';
const SET_LOADER = 'OrderReducer/SET_LOADER';
const SETSTARTDATE = 'OrderReducer/SETSTARTDATE';
const SETENDDATE = 'OrderReducer/SETENDDATE';
const CHANGETEXT = 'OrderReducer/CHANGETEXT';
const SETCHANGE = 'OrderReducer/SETCHANGE';

// <<<<<< IMPORTS >>>>>>

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  loader: false,
  products: [],
  startdate: '',
  enddate: '',
  change: false,
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case UPSORT: {
      const newSort = state.products.slice();
      const index = action.payload.index;
      if (index > 0) {
        const obj = state.products[index - 1];
        const obj2 = state.products[index];
        newSort[index] = {
          ...obj2,
          Number: obj.Number,
        };
        newSort[index - 1] = {
          ...obj,
          Number: obj2.Number,
        };
      }
      return {...state, products: newSort};
    }
    case CHANGETEXT: {
      const newSort = state.products.slice();
      const index = action.payload.index;
      newSort[index][action.payload.key] = action.payload.text;
      return {...state, products: newSort};
    }
    case DOWNSORT: {
      const newSort = state.products.slice();
      const index = action.payload.index;
      if (index < newSort.length - 2) {
        const obj = state.products[index + 1];
        const obj2 = state.products[index];
        newSort[index] = {
          ...obj2,
          Number: obj.Number,
        };
        newSort[index + 1] = {
          ...obj,
          Number: obj2.Number,
        };
      }
      return {...state, products: newSort};
    }
    case DELETEELEMENT: {
      const newData2 = state.products.slice();
      newData2.splice(action.payload, 1);
      return {...state, products: newData2};
    }
    case SET_LOADER:
      return {...state, loader: action.payload};
    case SETCHANGE:
      return {...state, change: action.payload};
    case SETSTARTDATE:
      return {...state, startdate: action.payload};
    case SETENDDATE:
      return {...state, enddate: action.payload};

    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>

export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const upSortAC = (payload) => ({type: UPSORT, payload});
export const downSortAC = (payload) => ({type: DOWNSORT, payload});
export const deleteElementAC = (payload) => ({type: DELETEELEMENT, payload});
export const changeTextAC = (payload) => ({type: CHANGETEXT, payload});
export const setLoaderAC = (payload) => ({type: SET_LOADER, payload});
export const setChangeAC = (payload) => ({type: SETCHANGE, payload});
export const setStartDateAC = (payload) => ({type: SETSTARTDATE, payload});
export const setEndDateAC = (payload) => ({type: SETENDDATE, payload});

// <<<<<< THUNKS >>>>>>

export const getProducts = ({startdate, enddate}) => (dispatch, getData) => {
  const {token, UIDStructure} = getData().UserState;
  dispatch(setLoaderAC(true));
  api(`listwarehouse/${UIDStructure}/${startdate}/${enddate}`, 'GET', token)
    .then((res) => {
      dispatch(setProductsAC(newList(res)));
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
    });
};

export const deleteWarehouseList = (list, func) => (dispatch, getData) => {
  const {token, UIDStructure} = getData().UserState;
  const date = getData().OrderState;
  api('deletewarehouselist', 'POST', token, {
    UIDStructure,
    Products: list,
  })
    .then((res) => {
      dispatch(setLoaderAC(false));
      dispatch(getProducts({startdate: date.startdate, enddate: date.enddate}));
      func(false);
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
      func(false);
    });
};

export const addWarehouseList = (list, func) => (dispatch, getData) => {
  const date = getData().OrderState;
  const {token, UIDStructure} = getData().UserState;
  api('addwarehouselist', 'POST', token, {
    UIDStructure,
    Products: list,
    startdate: date.startdate,
    enddate: date.enddate,
  })
    .then((res) => {
      dispatch(getProducts({startdate: date.startdate, enddate: date.enddate}));
      dispatch(setLoaderAC(false));
      ToastAndroid.show('Success', ToastAndroid.SHORT);
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
    });
};

export const changeNumber = (func) => (dispatch, getData) => {
  const {token, UIDStructure} = getData().UserState;
  const date = getData().OrderState;
  const list = date.products.map((i) => {
    delete i.prevNumber;
    delete i.nextNumber;
    return i;
  });
  api('changenumber', 'POST', token, {
    UIDStructure: UIDStructure,
    Products: list,
  })
    .then((res) => {
      dispatch(getProducts({startdate: date.startdate, enddate: date.enddate}));
      dispatch(setLoaderAC(false));
      dispatch(setChangeAC(false));
      ToastAndroid.show('Success', ToastAndroid.SHORT);
      func('');
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      func('');
    });
};
export const warehouse = (func) => (dispatch, getData) => {
  const {token, UIDStructure} = getData().UserState;
  const date = getData().OrderState;
  const list = date.products.map((i) => {
    return {
      UIDProduct: i.UIDProduct,
      Amount: i.Amount,
      Normal: i.Normal,
      Extra: i.Extra,
    };
  });
  api('warehouse', 'POST', token, {
    UIDStructure,
    Products: list,
  })
    .then((res) => {
      dispatch(getProducts({startdate: date.startdate, enddate: date.enddate}));
      dispatch(setLoaderAC(false));
      ToastAndroid.show('Success', ToastAndroid.SHORT);
      func('');
    })
    .catch((e) => {
      func('');
    });
};
