
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from 'store/history'
import { renderRouteConfigV3 } from 'store/routeConfig'
import 'styles/root.scss'

export default class Root extends PureComponent {

  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  }

  render () {
    const { store, routeConfig } = this.props
    const children = renderRouteConfigV3(null, routeConfig, '/')
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </Provider>
    )
  }
}