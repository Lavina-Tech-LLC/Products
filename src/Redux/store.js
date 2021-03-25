import {combineReducers, createStore, applyMiddleware} from 'redux';
import MainReducer from './MainReducer';
import thunk from 'redux-thunk';
import RemainderReducer from './RemainderReducer';

const Reducers = combineReducers({
  mainState: MainReducer,
  RemainderState: RemainderReducer,
});

let store = createStore(Reducers, applyMiddleware(thunk));

export default store;
