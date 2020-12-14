import { combineReducers } from 'redux';
import { RESET, TABLE } from './constants';

function table(state = [], { type, payload }) {
  switch (type) {
    case TABLE:
      return  state.length  < 2000 ? [payload, ...state]: state;
      //return  [payload, ...state];
    default:
      return state;
  }
}

const combine = combineReducers({
  table,
});

function reducer(state, action) {
  if(action.type === RESET) {
    state = undefined;
  }
  return combine(state, action);
}

export default reducer;