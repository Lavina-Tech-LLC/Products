//   <<<<<< types >>>>>>

const SET_SEARCH = 'ComingReducer/SET_SEARCH';
const SET_LIST_DONE_INVOICE = 'ComingReducer/SET_LIST_DONE_INVOICE';
const SET_LIST_INVOICE = 'ComingReducer/SET_LIST_INVOICE';
const SET_PRODUCTS = 'ComingReducer/SET_PRODUCTS';
const SET_LOADER = 'ComingReducer/SET_LOADER';
const SET_INVOICE = 'ComingReducer/SET_INVOICE';
const SET_PRODUCT = 'ComingReducer/SET_PRODUCT';
const CHANGE_AMOUNT = 'ComingReducer/CHANGE_AMOUNT';

// <<<<<< IMPORTS >>>>>>
import {Dimensions, ToastAndroid} from 'react-native';
import api from '../API/api';
import {getDate, summa} from '../Utils/helpers';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  search: '',
  loader: false,
  products: [],
  product: '',
  listInvoice: [],
  listDoneInvoice: [],
  invoice: {},
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {...state, search: action.payload};
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_INVOICE:
      return {...state, invoice: action.payload};
    case SET_LIST_DONE_INVOICE:
      return {...state, listDoneInvoice: action.payload};
    case CHANGE_AMOUNT:
      const prd = state.products.map((p) => {
        if (state.product && p.UIDProduct === state.product.UIDProduct) {
          p.amountfact = action.payload;
        }
        return p;
      });
      return {...state, products: prd};
    case SET_LIST_INVOICE:
      return {...state, listInvoice: action.payload};
    case SET_LOADER:
      return {...state, loader: action.payload};
    case SET_PRODUCT:
      return {...state, product: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setSearchComingAC = (payload) => ({type: SET_SEARCH, payload});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setInvoiceAC = (payload) => ({type: SET_INVOICE, payload});
export const setProductAC = (payload) => ({type: SET_PRODUCT, payload});
export const changeAmountAC = (payload) => ({type: CHANGE_AMOUNT, payload});
export const setListDoneInvoiceAC = (payload) => ({
  type: SET_LIST_DONE_INVOICE,
  payload,
});
export const setListInvoiceAC = (payload) => ({
  type: SET_LIST_INVOICE,
  payload,
});
export const setLoaderAC = (payload) => ({type: SET_LOADER, payload});

// <<<<<< THUNKS >>>>>>

export const getListDoneInvoice = (type) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api(
    `${
      type === 'done' ? 'listdoneinvoice' : 'listinvoice'
    }?UIDStructure=${UIDStructure}&date=${getDate()}`,
    'GET',
    token,
  )
    .then((res) => {
      res.length < 1 &&
        ToastAndroid.show(
          (type === 'done' ? 'Принятые Накладные' : 'Накладные (для прихода)') +
            ' пока пустой',
          ToastAndroid.SHORT,
        );
      dispatch(
        type === 'done' ? setListDoneInvoiceAC(res) : setListInvoiceAC(res),
      );
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};

export const getProducts = (type, uid) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api(`invoiceinfo/${uid}`, 'GET', token)
    .then((res) => {
      dispatch(setProductsAC(res));
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};

export const synchStockWarehouse = (func) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  api('desk/synchstockwarehouse', 'POST', token, {id: UIDStructure})
    .then(() => {
      ToastAndroid.show('success', ToastAndroid.SHORT);
      dispatch(getListDoneInvoice(''));
      dispatch(getListDoneInvoice('done'));
      func();
    })
    .catch((e) => {
      console.log(e);
      func();
    });
};

export const invoice = (type, uid) => (dispatch, getState) => {
  const {token, UIDStructure} = getState().UserState;
  const {invoice, products} = getState().ComingState;
  const body = {
    UIDstructure: UIDStructure,
    UIDInvoice: invoice.UIDInvoice,
    Products: products.map((product) => ({
      UIDProduct: product.UIDProduct,
      Amount:
        product.amountfact || String(summa(product.amountfact)) === String(0)
          ? summa(product.amountfact)
          : product.Amount,
    })),
  };
  api('invoice', 'POST', token, body)
    .then((res) => {
      dispatch(getListDoneInvoice(''));
      dispatch(getListDoneInvoice('done'));
      dispatch(setProductsAC([]));
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      dispatch(setLoaderAC(false));
      console.log(e);
    });
};
