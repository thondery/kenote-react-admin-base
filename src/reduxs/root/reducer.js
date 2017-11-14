// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'
import { actions } from './index';

const initState = {
  initialPending: false,
  initialError: -1,
  initialMessage: null,
  welcome: null
}

const ACTION_HANDLERS = {
  [types.ROOT_FETCH_INITIAL_BEGIN]: (state, action) => {
    return {
      ...state,
      initialPending: true,
      welcome: null
    }
  },
  [types.ROOT_FETCH_INITIAL_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, Status } = payload
    let newState = null
    if (data && Status.code === 0) {
      newState = {
        welcome: data.welcome
      }
    }
    return {
      ...state,
      ...statusToError(payload, 'initialError', 'initialMessage'),
      initialPending: false,
      ...newState
    }
  },
  [types.ROOT_FETCH_INITIAL_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'initialError', 'initialMessage'),
      initialPending: false,
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)