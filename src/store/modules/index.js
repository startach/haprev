import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';
import hospitals from './hospitals';

const reducers = combineReducers({
  user,
  contacts,
  hospitals,
});

export default reducers;

