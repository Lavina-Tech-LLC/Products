import api from '../API/api';

// TYPES
const SET_UID = 'USER/SET_UID';
const SET_TOKEN = 'USER/SET_TOKEN';
const SET_STRUCTURES = 'USER/SET_STRUCTURES';
const SET_IS_BOSS = 'USER/SET_IS_BOSS';

//initial state
const initialState = {
  token: '',
  UIDStructure: '',
  structures: [],
  isBoss: false,
};

//Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_IS_BOSS:
      return {...state, isBoss: action.payload};
    case SET_STRUCTURES:
      return {...state, structures: action.payload};
    case SET_UID:
      return {...state, UIDStructure: action.payload};
    default:
      return {...state};
  }
};

// action creators
export const setStructureAC = (payload) => ({type: SET_STRUCTURES, payload});
export const setTokenAC = (payload) => ({type: SET_TOKEN, payload});
export const setUidAC = (payload) => ({type: SET_UID, payload});
export const setIsBossAC = (payload) => ({type: SET_IS_BOSS, payload});

//thunks

export const getOption = (token) => (dispatch, getState) => {
  //const token = getState().UserState.token;
  api('1/getoptions', 'GET', token)
    .then((res) => {
      if (res?.СтрутурныеЕдиницы.length > 1) {
        dispatch(setStructureAC(res.СтрутурныеЕдиницы));
      } else {
        if (res?.СтрутурныеЕдиницы[0]?.Уид) {
          dispatch(setUidAC(res.СтрутурныеЕдиницы[0].Уид));
          dispatch(setStructureAC(res.СтрутурныеЕдиницы));
        }
      }
      dispatch(setIsBossAC(res.ЭтоБосс));
    })
    .catch((e) => console.log(e));
};
