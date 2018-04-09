import { combineReducers } from 'redux';
import user from './user'
import institues from './Institutes'
import events from './events'

const reducers = combineReducers({
  user,
  institues,
  events
});

export default reducers;

