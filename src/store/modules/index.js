import { combineReducers } from 'redux';
import user from './user'
import institutes from './Institutes'
import events from './events'
import contacts from './contacts'
import nav from './nav'

const reducers = combineReducers({
  user,
  institutes,
  events,
  contacts,
  nav,
});

export default reducers;

