import _ from 'lodash'
import admins from '../data/admin'

export default (params, header) => {
  const { username, password } = params
  let auth = _.find(admins, { username, password })
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
        message: '用户名/密码错误！'
      }
    }
  }
  return response
}