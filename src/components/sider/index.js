import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import _ from 'lodash'
import './style.scss'

const SubMenu = Menu.SubMenu

export default class Sider extends PureComponent {
  
  static propTypes = {
    location: PropTypes.object,
    menuSubs: PropTypes.object,
    footer: PropTypes.func
  }
  
  static defaultProps = {
    location: null,
    menuSubs: null,
    footer: (collapsed) => (
      <a href="https://github.com/thondery" target="_blank">
        <Icon type="github" style={!collapsed ? { fontSize: '16px' } : null} />
        {!collapsed && <span>github/thondery</span>}
      </a>
    )
  }

  state = {
    collapsed: false
  }
  
  constructor (props) {
    super(props)
  }
  
  render() {
    const { location, menuSubs, footer } = this.props
    const { pathname } = location
    const pathMatch = pathname.match(/^(\/)([a-z\-]+)/)
    return (
      <div className={'layout-sider'} 
        style={this.state.collapsed ? { flex: '0 0 64px' } : null}>
        <div className={'menu-collapsed'} 
          onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div className="menu-bodyer">
          <Menu
            mode={'inline'}
            theme={'dark'}
            inlineCollapsed={this.state.collapsed}
            defaultOpenKeys={[pathMatch && pathMatch[2]]}
            selectedKeys={[pathname.toLowerCase()]}
          >
            {menuSubs && _.keys(menuSubs).map( (item, i) => {
              let { key, name, icon, data, path } = menuSubs[item]
              return _.has(menuSubs[item], 'data') && data.length > 0
                ? this.renderSubMenu(key, name, icon, data, pathname.toLowerCase())
                : (
                  <Menu.Item key={`/${key === 'home' ? '' : key}`}>
                    <Link to={`/${key === 'home' ? '' : key}`}>
                      {icon}
                      <span>{name}</span>
                    </Link>
                  </Menu.Item>
                )
            })}
          </Menu>
        </div>
        {footer && (
          <div className={'menu-footer'} >
            {footer(this.state.collapsed)}
          </div>
        )}
      </div>
    )
  }
  
  renderSubMenu (key, name, icon, data, pathname) {
    return (
      <SubMenu
        key={key}
        title={<span>{icon}<span>{name}</span></span>} >
        {data.map( (item, i) => {
          return(
            <Menu.Item key={`/${item.path}/${item.key}`}>
              <Link to={`/${item.path}/${item.key}`}>
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          )
        })}
      </SubMenu>
    )
  }
}