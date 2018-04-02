import { combineReducers } from 'redux';
import user from './user'
import institues from './Institutes'

const reducers = combineReducers({
  user,
  institues,
});

export default reducers;

