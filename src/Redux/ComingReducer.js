//   <<<<<< types >>>>>>
const SET_PATH = 'MainReducer/SET_PATH';
const SET_SEARCH = 'BalanceReducer/SET_SEARCH';
// <<<<<< IMPORTS >>>>>>
import {Dimensions} from 'react-native';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
  search: '',
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {...state, search: action.payload};
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});
export const setSearchAC = (payload) => ({type: SET_SEARCH, payload});

// <<<<<< THUNKS >>>>>>
