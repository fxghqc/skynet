import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import reqReducer from './reqReducers'
import counter from './modules/counter'

export default combineReducers({
  reqReducer,
  counter,
  router
})
