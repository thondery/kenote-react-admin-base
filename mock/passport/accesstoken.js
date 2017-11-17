import _ from 'lodash'
import admins from '../data/admin'

export default (params, header) => {
  const { Authorization } = header
  let auth = _.find(admins, { accesskey: Authorization })
  let response = {
    data: null
  }
  if (auth) {
    response = {
      ...response,
      data: {
        auth: _.omit(auth, ['password'])
      }
    }
  }
  else {
    response = {
      ...response,
      Status: {
        code: 1001,
        message: '尚未登录或登录已失效！'
      }
    }
  }
  return response
}