// ------------------------------------
// Utils
// ------------------------------------
import _ from 'lodash'
import { httpServices } from 'http-services'
import config from 'config'
import fetchMock from 'fetch-mock'

const { domain, apiPath, isMock } = config
export const REDUX_FETCH_TIMEOUT = 500
var mockConf = null

class MockServies {

  constructor (isMock = true) {
    this.isMock = isMock
    this.httpServices = new httpServices(domain, apiPath)
    if (isMock) {
      mockConf = require('../../mock').default
    }
  }

  GET (url, params, header = {}) {
    if (this.isMock) {
      let mockData = mockConf && mockConf[`GET: ${url}`]
      mockData && fetchMock.mock('*', mockData)
    }
    return this.httpServices.GET(url, params, header)
    fetchMock.restore()
  }
  
  POST (url, params, header = {}) {
    if (this.isMock) {
      let mockData = mockConf && mockConf[`POST: ${url}`]
      mockData && fetchMock.mock('*', mockData)
    }
    return this.httpServices.POST(url, params, header)
    fetchMock.restore()
  }
}

export const HttpServices = new MockServies(isMock)

export const getReducers = (Reduxs) => {
  let Reducers = {}
  for (let e of _.keys(Reduxs)) {
    if (!/Reducer$/.test(e)) continue
    Reducers[_.upperFirst(e.replace(/Reducer$/, ''))] = Reduxs[e]
  }
  return Reducers
}

export const getRoutes = (Features) => {
  let Routes = []
  for (let e of _.keys(Features)) {
    Routes.push(Features[e])
  }
  return Routes
}