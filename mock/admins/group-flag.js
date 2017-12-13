import _ from 'lodash'
import groups from '../data/group'

export default (params, header) => {
  const { flag, id } = params
  let useGroup = _.find(groups, { _id: id })
  let response = {
    data: {
      ...useGroup,
      flag
    }
  }
  return response
}