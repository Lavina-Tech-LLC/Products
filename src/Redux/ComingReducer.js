//   <<<<<< types >>>>>>

const SET_SEARCH = 'ComingReducer/SET_SEARCH';
const SET_CHANGE = 'ComingReducer/SET_CHANGE';
const SET_LIST_DONE_INVOICE = 'ComingReducer/SET_LIST_DONE_INVOICE';
const SET_LIST_INVOICE = 'ComingReducer/SET_LIST_INVOICE';
const SET_PRODUCTS_INVOICE = 'ComingReducer/SET_PRODUCTS_INVOICE';
const SET_PRODUCTS = 'ComingReducer/SET_PRODUCTS';
const SET_LOADER = 'ComingReducer/SET_LOADER';
const SET_INVOICE = 'ComingReducer/SET_INVOICE';
const SET_PRODUCT = 'ComingReducer/SET_PRODUCT';
const CHANGE_AMOUNT = 'ComingReducer/CHANGE_AMOUNT';
const SET_CURRENT_AMOUNT = 'ComingReducer/SET_CURRENT_AMOUNT';
const CHANGE_AMOUNT_WITH_SOCKET = 'ComingReducer/CHANGE_AMOUNT_WITH_SOCKET';
const REMOVE_IN_LIST_INVOICE = 'ComingReducer/REMOVE_IN_LIST_INVOICE';

// <<<<<< IMPORTS >>>>>>
import {Dimensions, ToastAndroid} from 'react-native';
import api from '../API/api';
import {getDate, summa} from '../Utils/helpers';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  search: '',
  isChange: false,
  loader: false,
  products: [],
  product: '',
  listInvoice: [],
  listDoneInvoice: [],
  invoice: {},
  currentAmount: {},
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {...state, search: action.payload};
    case SET_CURRENT_AMOUNT:
      return {...state, currentAmount: action.payload};
    case SET_CHANGE:
      return {...state, isChange: action.payload};
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_INVOICE:
      return {...state, invoice: action.payload};
    case SET_LIST_DONE_INVOICE: {
      const newList =
        action.payload.length > 0
          ? action.payload.map((invoice) => ({invoice, products: []}))
          : [];
      return {...state, listDoneInvoice: newList};
    }
    case CHANGE_AMOUNT:{
      const prd = state.products.map((p) => {
        if (state.product && p.UIDProduct === state.product.UIDProduct) {
          p.CurrentAmount = action.payload;
        }
        return p;
      });
      return {...state, isChange: true, products: prd};}
    case CHANGE_AMOUNT_WITH_SOCKET:
       { const prd = state.products.map((p) => {
          if ( p.UIDProduct === action.payload.UIDProduct) {
            p.CurrentAmount =  action.payload.CurrentAmount
          }
          return p;
        });
        return {...state, isChange: true, products: prd};}
    case SET_LIST_INVOICE: {
      const newList =
        action.payload.length > 0
          ? state.listInvoice.length < 1
            ? action.payload.map((invoice) => ({invoice, products: []}))
            : action.payload.map((invoice) => {
                const inv = state.listInvoice.find(
                  (item) => item.invoice.UIDInvoice === invoice.UIDInvoice,
                );
                return inv ? inv : {invoice, products: []};
              })
          : [];
      return {...state, listInvoice: newList};
    }
    case REMOVE_IN_LIST_INVOICE: {
      const newList =  state.listInvoice.filter(item=> item.invoice.UIDInvoice !== action.payload)
      return {...state, listInvoice: newList};
    }
    case SET_PRODUCTS_INVOICE: {
      const prevList =
        action.payload.type === 'done'
          ? state.listDoneInvoice
          : state.listInvoice;
      let newList = prevList.map((item) => {
        if (item.invoice.UIDInvoice === action.payload.id) {
          item.products = state.products;
        }
        return item;
      });

      return action.payload.type === 'done'
        ? {...state, listDoneInvoice: newList}
        : {...state, listInvoice: newList};
    }
    case SET_LOADER:
      return {...state, loader: action.payload};
    case SET_PRODUCT:
      return {...state, product: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setIsChangeAC = (payload) => ({type: SET_CHANGE, payload});
export const setCurrentAmountAC = (payload) => ({type: SET_CURRENT_AMOUNT, payload});
export const changeAmountWithSocketAC = (payload) => ({type: CHANGE_AMOUNT_WITH_SOCKET, payload});
export const removeInvoiceAC = (payload) => ({type: REMOVE_IN_LIST_INVOICE, payload});
export const setSearchComingAC = (payload) => ({type: SET_SEARCH, payload});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setInvoiceAC = (payload) => ({type: SET_INVOICE, payload});
export const setInvoiceProductsAC = (payload) => ({
  type: SET_PRODUCTS_INVOICE,
  payload,
});
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
  const {date} = getState().mainState;
  api(
    `${
      type === 'done' ? 'listdoneinvoice' : 'listinvoice'
    }?UIDStructure=${UIDStructure}&date=${getDate(date)}`,
    'GET',
    token,
  )
    .then((res) => {
      res.length < 1
        ? ToastAndroid.show(
            (type === 'done'
              ? 'Принятые Накладные'
              : 'Накладные (для прихода)') + ' пока пустой',
            ToastAndroid.SHORT,
          )
        : dispatch(
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
  const list = getState().ComingState[type];
  const invoice = list.find((item) => item?.invoice.UIDInvoice === uid);
  api(`invoiceinfo/${uid}`, 'GET', token)
        .then((res) => {
          dispatch(setProductsAC(res));
        })
        .catch((e) => {
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
      Amount: Number(product.CurrentAmount || 0)
        // product.amountfact || String(summa(product.amountfact)) === String(0)
        //   ? summa(product.amountfact)
        //   : product.Amount,
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



export const sendCurrentAmount = (body) => (dispatch, getState) => {
  const {token} = getState().UserState;
  console.log(body);
  api('/setCurrentAmount', 'POST', token,body)
    .then(() => {
     
    })
    .catch((e) => {
      console.log(e);
    });
};
