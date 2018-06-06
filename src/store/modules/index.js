import { combineReducers } from 'redux';
import user from './user'
import institutes from './Institutes'
import events from './events'

const reducers = combineReducers({
  user,
  institutes,
  events
});

export default reducers;

