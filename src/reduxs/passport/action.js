// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'
import { HttpServices, REDUX_FETCH_TIMEOUT } from 'services/utils'
import * as storageService from 'services/storage'
import _ from 'lodash'
import fetchMock from 'fetch-mock'
import { getToken, setToken } from 'services/token'

export function accessToken () {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_FETCH_ACCESSTOKEN_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const auth = await storageService.getItem('auth')
          const token = _.has(auth, 'accesskey') && auth.accesskey
          setToken(token)
          const header = {
            Authorization: token
          }
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

export function logout () {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_LOCAL_LOGOUT_BEGIN, null))
    setTimeout( () => {
      dispatch(createAction(types.PASSPORT_LOCAL_LOGOUT_FINISH, null))
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function modifyPwd ({ password, newpassword }) {
  return dispatch => {
    dispatch(createAction(types.PASSPORT_FETCH_MODIFYPWD_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const header = {
            Authorization: token
          }
          const result = await HttpServices.POST('/modify_pwd', { password, newpassword }, header)
          fetchMock.restore()
          dispatch(createAction(types.PASSPORT_FETCH_MODIFYPWD_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.PASSPORT_FETCH_MODIFYPWD_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}