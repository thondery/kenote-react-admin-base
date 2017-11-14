// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT } from '../../services/utils'

export function initial () {
  return dispatch => {
    dispatch(createAction(types.ROOT_FETCH_INITIAL_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await HttpServices.GET('/initial')
          dispatch(createAction(types.ROOT_FETCH_INITIAL_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ROOT_FETCH_INITIAL_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}
