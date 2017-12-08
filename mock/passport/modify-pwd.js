import _ from 'lodash'
import admins from '../data/admin'

export default (params, header) => {
  const { Authorization } = header
  const { password, newpassword } = params
  let auth = _.find(admins, { accesskey: Authorization })
  let response = {
    data: null
  }
  if (auth) {
    if (auth.password !== password) {
      response = {
        ...response,
        Status: {
          code: 1002,
          message: '当前密码错误！'
        }
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