import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import postsApi from './reqReducers'
import counter from './modules/counter'

export default combineReducers({
  postsApi,
  counter,
  router
})
