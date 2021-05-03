import api from '../API/api';

// TYPES
const SET_UID = 'USER/SET_UID';
const SET_TOKEN = 'USER/SET_TOKEN';

//initial state
const initialState = {
  token: '',
  UIDStructure: '',
};

//Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_UID:
      return {...state, UIDStructure: action.payload};
    default:
      return {...state};
  }
};

// action creators
export const setTokenAC = (payload) => ({type: SET_TOKEN, payload});
export const setUidAC = (payload) => ({type: SET_UID, payload});

//thunks

export const getOption = (token) => (dispatch, getState) => {
  //const token = getState().UserState.token;
  api('1/getoptions', 'GET', token)
    .then((res) => {
      res?.СтрутурныеЕдиницы[0]?.Уид &&
        dispatch(setUidAC(res.СтрутурныеЕдиницы[0].Уид));
    })
    .catch((e) => console.log(e));
};
