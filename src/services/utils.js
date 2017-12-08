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
const _HttpServices = new httpServices(domain, apiPath)

class mockServies {

  constructor (isMock = true) {
    this.isMock = isMock
    if (isMock) {
      mockConf = require('../../mock').default
    }
  }

  mock (url, params = {}, header = {}) {
    let mockData = null
    if (this.isMock) {
      mockData = mockConf && mockConf[url]
    }
    let matcher = `${domain}${apiPath}${url.replace(/^(POST|GET)\:\s/, '')}`
    console.log(matcher)
    mockData && fetchMock.mock(matcher, mockData(params, header))
  }
  
  GET (url, params = {}, header = {}) {
    let mockData = null
    if (this.isMock) {
      mockData = mockConf && mockConf[`GET: ${url}`]
    }
    let matcher = `${domain}${apiPath}${url}`
    mockData && fetchMock.mock(matcher, mockData(params, header))
    return _HttpServices.GET(url, params, header)
  }

  POST (url, params = {}, header = {}) {
    let mockData = null
    if (this.isMock) {
      mockData = mockConf && mockConf[`POST: ${url}`]
    }
    let matcher = `${domain}${apiPath}${url}`
    mockData && fetchMock.mock(matcher, mockData(params, header))
    return _HttpServices.POST(url, params, header)
  }
}

export const HttpServices = new mockServies(isMock)

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

export const getMenuSub = (routes, opts) => {
  let menuSub = {
    ...opts,
    data:  []
  }
  for (let e of routes.childRoutes) {
    !e.isIndex && menuSub.data.push({
      key: e.path,
      name: e.name,
      path: opts.key
    })
  }
  return menuSub
}