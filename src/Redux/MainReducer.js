//   <<<<<< types >>>>>>
const SET_PATH = 'MainReducer/SET_PATH';
const CHANGE_PATH = 'MainReducer/CHANGE_PATH';
const SET_PARAMS = 'MainReducer/SET_PARAMS';
const SET_LOADING = 'MainReducer/SET_LOADING';
const SET_CATEGORY = 'MainReducer/SET_CATEGORY';
// <<<<<< IMPORTS >>>>>>
import {Dimensions} from 'react-native';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  navigation: {path: '', history: []},
  loading: false,
  params: '',
  categories: ['Остаток', 'Приход', 'Списание', 'Баланс', 'Заказ'],
  category: 'Остаток',
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
    case SET_LOADING:
      return {...state, loading: action.payload};
    case SET_CATEGORY:
      return {...state, category: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});
export const setParamsAC = (payload) => ({type: SET_PARAMS, payload});
export const setLoadingAC = (payload) => ({type: SET_LOADING, payload});
export const setCategoryAC = (payload) => ({type: SET_CATEGORY, payload});

// <<<<<< THUNKS >>>>>>
