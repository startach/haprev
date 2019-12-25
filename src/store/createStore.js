import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './modules'

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk))
)

export default store
