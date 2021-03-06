// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'

export function initialComplete (tag = null) {
  return dispatch => {
    setTimeout( () => {
      return dispatch(createAction(types.ROOT_INITIAL_COMPLETE, tag))
    }, 1500)
  }
}

export function initialProgress (pending, tag = null) {
  return dispatch => {
    setTimeout( () => {
      return dispatch(createAction(types.ROOT_INITIAL_PENDING, {pending, tag}))
    }, 800)
  }
}
