
import { APILoad } from './utils'
import Login from './passport/login'

export default {
  ['POST: /login']: (params, header) => 
    APILoad('./passport/login', params, header),
  ['POST: /modify_pwd']: (params, header) => 
    APILoad('./passport/modify-pwd', params, header),

  ['GET: /accesstoken']: (params, header) => 
    APILoad('./passport/accesstoken', params, header)
}