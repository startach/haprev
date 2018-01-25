import { combineReducers } from 'redux';
import dummy from './dummy';
import user from './user'

const reducers = combineReducers({
  dummy,
  user,
});

export default reducers;

