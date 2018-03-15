import { combineReducers } from 'redux';
import user from './user'
import messages from './messages'
import institues from './Institutes'

const reducers = combineReducers({
  user,
  messages,
  institues,
});

export default reducers;

