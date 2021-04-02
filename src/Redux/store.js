import {combineReducers, createStore, applyMiddleware} from 'redux';
import MainReducer from './MainReducer';
import thunk from 'redux-thunk';
import RemainderReducer from './RemainderReducer';
import BalanceReducer from './BalanceReducer';
import ComingReducer from './ComingReducer';

const Reducers = combineReducers({
  mainState: MainReducer,
  RemainderState: RemainderReducer,
  BalanceState: BalanceReducer,
  ComingState: ComingReducer,
});

let store = createStore(Reducers, applyMiddleware(thunk));

export default store;
