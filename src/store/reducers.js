import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import * as Reduxs from 'reduxs'
import { getReducers } from 'services/utils'

const Reducers = getReducers(Reduxs)

export default combineReducers({
  router,
  ...Reducers
})