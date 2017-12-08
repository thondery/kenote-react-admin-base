import _ from 'lodash'
import groups from '../data/group'

export default (params, header) => {
  let response = {
    data: groups
  }
  return response
}