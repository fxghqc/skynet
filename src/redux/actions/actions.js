import fetch from 'isomorphic-fetch'

export const REQUEST_COUNT = 'REQUEST_COUNT'
export const RECEIVE_COUNT = 'RECEIVE_COUNT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit (subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit (subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts (subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function requestCount (countItem) {
  return {
    type: REQUEST_COUNT,
    countItem
  }
}

function receivePosts (subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now()
  }
}

function receiveCount (countItem, json) {
  return {
    type: RECEIVE_COUNT,
    countItem,
    count: json.total,
    receivedAt: Date.now()
  }
}

function fetchCounts (countItem) {
  return (dispatch) => {
    dispatch(requestCount(countItem))
    return fetch(`http://localhost:3010/api/v1/${countItem}/count`)
      .then((req) => req.json())
      .then((json) => dispatch(receiveCount(countItem, json)))
  }
}

function fetchPosts (subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then((req) => req.json())
      .then((json) => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchCount (state, countItem) {
  const countInfo = state.postsApi[countItem]
  if (!countInfo) {
    return true
  } else if (countInfo.isFetching) {
    return false
  } else {
    return countInfo.didInvalidate
  }
}

export function fetchCountIfNeeded (countItem) {
  return (dispatch, getState) => {
    if (shouldFetchCount(getState(), countItem)) {
      return dispatch(fetchCounts(countItem))
    }
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
