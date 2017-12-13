
import { APILoad } from './utils'
import Login from './passport/login'

export default {
  ['POST: /login']: (params, header) => 
    APILoad('./passport/login', params, header),
  ['POST: /modify_pwd']: (params, header) => 
    APILoad('./passport/modify-pwd', params, header),
  ['POST: /admins/group/edit/:id']: (params, header) => 
    APILoad('./admins/group-edit', params, header),
  ['POST: /admins/group/flag/:id']: (params, header) => 
    APILoad('./admins/group-flag', params, header),

  ['GET: /accesstoken']: (params, header) => 
    APILoad('./passport/accesstoken', params, header),
  ['GET: /admins/group']: (params, header) =>
    APILoad('./admins/group-list', params, header)
}