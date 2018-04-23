import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Permission from '../permission'
import Breadcrumb from '../breadcrumb'
import './style.scss'

export default class CoreLayout extends PureComponent {
  
  static propTypes = {
    children: PropTypes.node,
    pageCode: PropTypes.string,
    auth: PropTypes.object,
    header: PropTypes.element,
    sider: PropTypes.element,
    breadcrumb: PropTypes.array,
    pageLoading: PropTypes.bool,
    permissionView: PropTypes.element
  }
  
  static defaultProps = {
    children: null,
    pageCode: 'none',
    auth: null,
    header: null,
    sider: null,
    breadcrumb: null,
    pageLoading: false,
    permissionView: null
  }

  constructor (props) {
    super(props)
    this._loadingView = null
  }

  componentDidMount () {
    const { pageLoading } = this.props
    pageLoading && setTimeout(() => {
      this._loadingView.style.width = '100%'
      setTimeout(() => {
        this._loadingView.style.opacity = 0
      }, 1200)
    }, 0)
  }
  
  render() {
    const { children, auth, pageCode, header, sider, breadcrumb, pageLoading } = this.props
    const permissionView = this.renderPermission()
    let pageLoadStyle = !pageLoading ? { display: 'none' } : null
    return (
      <div className={'layout-warpper'} style={{ flexDirection: 'column' }}>
        {header}
        <div className={'layout-warpper'}>
          {sider}
          <Permission 
            className={'layout-page-container'}
            pageCode={pageCode} 
            flag={auth && auth.group.flag || []}
            viewComponent={permissionView}>
            <div>
              <Breadcrumb data={breadcrumb} />
              {children}
            </div>
            {pageLoading && <div 
              className={'layout-page-loading'} 
              ref={ view => this._loadingView = view } 
              style={{ width: '0%', ...pageLoadStyle }} 
              />}
          </Permission>
        </div>
      </div>
    )
  }
  
  renderPermission () {
    const { permissionView } = this.props
    return (
      <div className={'layout-page-container'} style={{ padding: 0, overflow: 'hidden' }}>
        {permissionView ? permissionView : (
          <div className="layout-page-not-found">
            <div className="page-not-found">
              <h1>401</h1>
              <div>
                <h2>The page is not allowed.</h2>
              </div>
            </div>
          </div>
        )}
        <div 
          className={'layout-page-loading'} 
          ref={ view => this._loadingView = view } 
          style={{ width: '0%' }} 
          />
      </div>
    )
  }
}