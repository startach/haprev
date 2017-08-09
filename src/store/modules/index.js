import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';

const reducers = combineReducers({
  user,
  contacts,
});

export default reducers;

