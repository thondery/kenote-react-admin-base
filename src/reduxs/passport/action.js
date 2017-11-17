// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT, MockServies } from 'services/utils'
import * as storageService from 'services/storage'
import _ from 'lodash'
import fetchMock from 'fetch-mock'

export function accessToken () {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_FETCH_ACCESSTOKEN_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const auth = await storageService.getItem('auth')
          const token = _.has(auth, 'accesskey') && auth.accesskey
          const header = {
            Authorization: token
          }
          MockServies.mock(`GET: /accesstoken`, null, header)
          const result = await HttpServices.GET('/accesstoken', null, header)
          fetchMock.restore()
          dispatch(createAction(types.PASSPORT_FETCH_ACCESSTOKEN_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_FETCH_ACCESSTOKEN_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function login ({ username, password }) {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_FETCH_LOGIN_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          MockServies.mock(`POST: /login`, { username, password })
          const result = await HttpServices.POST('/login', { username, password })
          fetchMock.restore()
          dispatch(createAction(types.PASSPORT_FETCH_LOGIN_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_FETCH_LOGIN_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}