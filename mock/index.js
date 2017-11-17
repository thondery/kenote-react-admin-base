
import { APILoad } from './utils'
import Login from './passport/login'

export default {
  ['POST: /login']: (params, header) => 
    APILoad('./passport/login', params, header),

  ['GET: /accesstoken']: (params, header) => 
    APILoad('./passport/accesstoken', params, header)
}