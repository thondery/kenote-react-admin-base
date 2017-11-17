// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT } from 'services/utils'
import * as storageService from 'services/storage'
import _ from 'lodash'

export function initial () {
  return dispatch => {
    dispatch(createAction(types.ROOT_FETCH_INITIAL_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const auth = await storageService.getItem('auth')
          const accesstoken = _.has(auth, 'accesskey') && auth.accesskey
          const header = {
            Authorization: accesstoken
          }
          const result = await HttpServices.GET('/accesstoken', null, header)
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
