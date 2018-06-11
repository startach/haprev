import { combineReducers } from 'redux';
import user from './user'
import institutes from './Institutes'
import events from './events'
import contacts from './contacts'
const reducers = combineReducers({
  user,
  institutes,
  events,
  contacts,
});

export default reducers;

