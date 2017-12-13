// ------------------------------------
// Reducer
// ------------------------------------
import { createReducer, statusToError, getStatusError } from 'http-services'
import * as types from './constant'

const initState = {
  getListPending: false,
  getListError: -1,
  getListMessage: null,
  listData: null,
  setFlagPending: false,
  setFlagError: -1,
  setFlagMessage: null
}

const ACTION_HANDLERS = {
  [types.ADMINSGROUP_FETCH_LIST_BEGIN]: (state, action) => {
    return {
      ...state,
      getListPending: true,
      getListError: -1,
      getListMessage: null
    }
  },
  [types.ADMINSGROUP_FETCH_LIST_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, Status } = payload
    return {
      ...state,
      ...statusToError(payload, 'getListError', 'getListMessage'),
      getListPending: false,
      listData: data
    }
  },
  [types.ADMINSGROUP_FETCH_LIST_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'getListError', 'getListMessage'),
      getListPending: false,
    }
  },
  [types.ADMINSGROUP_FETCH_FLAG_BEGIN]: (state, action) => {
    return {
      ...state,
      setFlagPending: true,
      setFlagError: -1,
      setFlagMessage: null
    }
  },
  [types.ADMINSGROUP_FETCH_FLAG_SUCCESS]: (state, action) => {
    const { payload } = action
    const { data, Status } = payload
    let newState = null
    if (data && Status.code === 0) {
      let listData = state.listData
      let useIndex = _.findIndex(listData, { _id: data._id })
      listData[useIndex] = data
      newState = { listData }
    }
    return {
      ...state,
      ...statusToError(payload, 'setFlagError', 'setFlagMessage'),
      setFlagPending: false,
      ...newState
    }
  },
  [types.ADMINSGROUP_FETCH_FLAG_FAILURE]: (state, action) => {
    const { error } = action
    const status = getStatusError(error)
    return {
      ...state,
      ...statusToError({ status }, 'setFlagError', 'setFlagMessage'),
      setFlagPending: false,
    }
  },
}

export default (state = initState, action) => createReducer(state, action, ACTION_HANDLERS)