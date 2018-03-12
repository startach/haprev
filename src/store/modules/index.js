import { combineReducers } from 'redux';
import dummy from './dummy';
import user from './user'
import messages from './messages'

const reducers = combineReducers({
  dummy,
  user,
  messages,
});

export default reducers;

