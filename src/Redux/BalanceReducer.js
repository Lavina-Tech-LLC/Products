//   <<<<<< types >>>>>>
const SET_PATH = 'Balance/SET_PATH';
const SET_PRODUCTS = 'Balance/SET_PRODUCTS';
const SET_LOADER = 'Balance/SET_LOADER';
// <<<<<< IMPORTS >>>>>>
import {Dimensions} from 'react-native';
import api from '../API/api';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  products: [],
  loader: false,
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_LOADER:
      return {...state, loader: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});
export const setProductsAC = (payload) => ({type: SET_PRODUCTS, payload});
export const setLoaderAC = (payload) => ({type: SET_LOADER, payload});
// <<<<<< THUNKS >>>>>>

export const getProducts = () => (dispatch, getState) => {
  const token = getState().UserState.token;
  dispatch(setLoaderAC(true));
  api('balance/716174b8-af8f-11ea-9e54-502b73d5e1bd', 'GET', token)
    .then((res) => {
      dispatch(
        setProductsAC(
          res.map((product) => ({
            barCode: product.Barcode,
            name: product.Номенклатура,
            startRem: product.НачалоДня,
            coming: product.Приход,
            sale: product.Продажа,
            writeOff: product.Продажа,
            remainder: product.Остаток,
            difference: product.Разница,
            price: product.Цена,
            amount: product.Сумма,
          })),
        ),
      );
      dispatch(setLoaderAC(false));
    })
    .catch((e) => {
      console.log(e);
      dispatch(setLoaderAC(false));
    });
};
