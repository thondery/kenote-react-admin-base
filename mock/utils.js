import _ from 'lodash'

export const APILoad = (mock, params = {}, header = {}) => {
  let mockAPI = require(`${mock}`).default
  let response = mockAPI(params, header)
  if (!_.has(response, 'Status')) {
    response = {
      ...response,
      Status: {
        code: 0,
        message: 'Request Success!'
      }
    }
  }
  return response
}