// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'
import * as storageService from 'services/storage'
import { setToken } from 'services/token'

const initState = {
  accessTokenPending: false,
  accessTokenError: -1,
  accessTokenMessage: null,
  loginPending: false,
  loginError: -1,
  loginMessage: null,
  auth: null,
  logoutPending: false,
  modifyPwdPending: false,
  modifyPwdError: -1,
  modifyPwdMessage: null
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
      updateAuth(payload)
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
  [types.PASSPORT_LOCAL_LOGOUT_BEGIN]: (state, action) => {
    return {
      ...state,
      logoutPending: true
    }
  },
  [types.PASSPORT_LOCAL_LOGOUT_FINISH]: (state, action) => {
    updateAuth(null)
    return {
      ...state,
      logoutPending: false,
      auth: null
    }
  },
  [types.PASSPORT_FETCH_MODIFYPWD_BEGIN]: (state, action) => {
    return {
      ...state,
      modifyPwdPending: true,
      modifyPwdError: -1,
      modifyPwdMessage: null
    }
  },
  [types.PASSPORT_FETCH_MODIFYPWD_SUCCESS]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      ...statusToError(payload, 'modifyPwdError', 'modifyPwdMessage'),
      modifyPwdPending: false,
    }
  },
  [types.PASSPORT_FETCH_MODIFYPWD_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'modifyPwdError', 'modifyPwdMessage'),
      modifyPwdPending: false,
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)

function updateAuth (payload) {
  if (!payload) {
    storageService.removeItem('auth')
    setToken(null)
    return
  }
  const { data, Status } = payload
  if (Status.code === 0) {
    const { auth } = data
    storageService.setItem('auth', auth)
    setToken(auth.accesskey)
  }
}