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

export function getlist () {
  return dispatch => {
    dispatch(createAction(types.ADMINSGROUP_FETCH_LIST_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const header = {
            Authorization: token
          }
          const result = await HttpServices.GET('/admins/group', null, header)
          fetchMock.restore()
          dispatch(createAction(types.ADMINSGROUP_FETCH_LIST_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ADMINSGROUP_FETCH_LIST_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}

export function setFlag (id, flag) {
  return dispatch => {
    dispatch(createAction(types.ADMINSGROUP_FETCH_FLAG_BEGIN, null))
    setTimeout( () => {
      return new Promise(async (resolve, reject) => {
        try {
          const token = getToken()
          const header = {
            Authorization: token
          }
          const result = await HttpServices.POST(`/admins/group/flag/${id}`, { flag }, header)
          fetchMock.restore()
          dispatch(createAction(types.ADMINSGROUP_FETCH_FLAG_SUCCESS, result))
          resolve(result)
        } catch (error) {
          dispatch(createAction(types.ADMINSGROUP_FETCH_FLAG_FAILURE, error))
          reject(error)
        }
      })
      .catch(() => {})
    }, REDUX_FETCH_TIMEOUT)
  }
}