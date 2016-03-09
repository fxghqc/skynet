// import { combineReducers } from 'redux'
import {
  INVALIDATE_SUBREDDIT,
  RECEIVE_COUNT, REQUEST_COUNT
} from './actions/actions'

function apis (state = {
  isFetching: false,
  didInvalidate: false,
  count: null
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_COUNT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        count: action.count,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsApi (state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_COUNT:
    case REQUEST_COUNT:
      console.log(action)
      let newObj = Object.assign({}, state, {
        [action.countItem]: apis(state[action.countItem], action)
      })
      console.log(newObj)
      return newObj
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   postsApi
// })

export default postsApi
