import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { passportActions } from 'reduxs'
import { Icon } from 'antd'
import { Layout } from 'components'
import Sider from './sider'
import Header from './header'

@connect(
  state => ({
    auth: state.Passport.auth
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions}, dispatch)
  })
)
export default class CoreLayout extends PureComponent {
  
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.any,
    auth: PropTypes.object,
    pageCode: PropTypes.string,
    breadcrumb: PropTypes.array
  }
  
  static defaultProps = {
    location: null,
    children: null,
    auth: null,
    pageCode: undefined,
    breadcrumb: null
  }

  render () {
    const { location, children, auth, pageCode, breadcrumb } = this.props
    const options = {
      auth,
      pageCode,
      breadcrumb,
      permissionView: (
        <div className="layout-page-not-found">
          <div className="page-not-found">
            <h1>403</h1>
            <div>
              <h2>The page is not allowed.</h2>
            </div>
          </div>
        </div>
      ),
      sider: (
        <Sider {...{ location }} />
      ),
      header: (
        <Header {...{ auth, actions: this.props.actions }} />
      ),
      pageLoading: true
    }
    return (
      <Layout {...options}>
        {children}
      </Layout>
    )
  }
}