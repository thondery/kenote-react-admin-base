// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'

const initState = {
  accessTokenPending: false,
  accessTokenError: -1,
  accessTokenMessage: null,
  loginPending: false,
  loginError: -1,
  loginMessage: null,
  auth: null
}

const ACTION_HANDLERS = {
  [types.PASSPORT_FETCH_ACCESSTOKEN_BEGIN]: (state, action) => {
    return {
      ...state,
      accessTokenPending: true,
      auth: null
    }
  },
  [types.PASSPORT_FETCH_ACCESSTOKEN_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, Status } = payload
    let newState = null
    if (data && Status.code === 0) {
      let { auth } = data
      newState = { auth }
    }
    return {
      ...state,
      ...statusToError(payload, 'accessTokenError', 'accessTokenMessage'),
      accessTokenPending: false,
      ...newState
    }
  },
  [types.PASSPORT_FETCH_ACCESSTOKEN_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'accessTokenError', 'accessTokenMessage'),
      accessTokenPending: false,
    }
  },
  [types.PASSPORT_FETCH_LOGIN_BEGIN]: (state, action) => {
    return {
      ...state,
      loginPending: true,
      auth: null
    }
  },
  [types.PASSPORT_FETCH_LOGIN_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, Status } = payload
    let newState = null
    if (data && Status.code === 0) {
      let { auth } = data
      newState = { auth }
    }
    return {
      ...state,
      ...statusToError(payload, 'loginError', 'loginMessage'),
      loginPending: false,
      ...newState
    }
  },
  [types.PASSPORT_FETCH_LOGIN_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'loginError', 'loginMessage'),
      loginPending: false,
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)