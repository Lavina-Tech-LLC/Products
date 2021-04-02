//   <<<<<< types >>>>>>
const SET_PATH = 'MainReducer/SET_PATH';
// <<<<<< IMPORTS >>>>>>
import {Dimensions} from 'react-native';

// <<<<<< iNITIAL STATE >>>>>>
const initialState = {
  size: (Number(Dimensions.get('window').width) * 0.064) / 100,
};

// <<<<<< REDUCER >>>>>>
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {...state};
  }
};

// <<<<<< ACTION CREATOR >>>>>>
export const setPathAC = (payload) => ({type: SET_PATH, payload});

// <<<<<< THUNKS >>>>>>
