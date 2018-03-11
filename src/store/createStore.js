import { createStore, applyMiddleware,compose  } from 'redux';
import reducers from './modules';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const store = createStore(
  reducers,
  //composeWithDevTools(applyMiddleware(thunk)),
  compose(applyMiddleware(thunk)),
);

export default store;
