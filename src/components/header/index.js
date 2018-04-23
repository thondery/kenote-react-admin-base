import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import NormalCell from './cell/normal'
import AuthCell from './cell/auth'
import _ from 'lodash'
import './style.scss'

export default class Header extends PureComponent {
  
  static propTypes = {
    auth: PropTypes.object,
    menus: PropTypes.array,
    onPressItem: PropTypes.func,
    logoSource: PropTypes.any,
    titleName: PropTypes.string
  }
  
  static defaultProps = {
    auth: null,
    menus: null,
    onPressItem: () => null,
    logoSource: require('../../assets/images/Icon-60@2x.png'),
    titleName: '管理控制台'
  }

  constructor (props) {
    super(props)
  }
  
  render() {
    const { auth, menus, onPressItem, logoSource, titleName } = this.props
    return (
      <div className={'layout-header'}>
        <div className={'app-header-start'}>
          <Link to={'/'} className="app-header-link app-header-logo">
            <img src={logoSource} />
          </Link>
          <Link to={'/'} className="app-header-link app-header-dashboard">
            <span>{titleName}</span>
          </Link>
        </div>
        <div className={'app-header-end'}>
          {menus && menus.map( (item, i) => {
            let { key, name, data, onPress } = item
            if (!data) {
              return (
                <div className={'app-header-link-div'} key={key} onClick={onPress}>
                  <a className={'app-header-link'}>
                    <span>{name}</span>
                  </a>
                </div>
              )
            }
            if (item.key === 'auth') {
              return (
                <AuthCell {...{ key, name, data, onPressItem }} />
              )
            }
            else if (item.key === 'message') {
              //
            }
            else if (item.key === 'search') {
              //
            }
            else if (_.has(data, 'component')) {
              return (
                <div className={'app-header-link-div'} key={key} onClick={onPress}>
                  <a className={'app-header-link'}>
                    {data.component}
                  </a>
                </div>
              )
            }
            else {
              return (
                <NormalCell {...{ key, name, data, onPressItem }} />
              )
            }
          })}
        </div>
      </div>
    )
  }
}

export const getMenuList = (menus) => {
  let list = []
  for (let e of menus) {
    if (_.has(e, 'data')) {
      list = _.concat(list, e.data)
    }
  }
  list = _.filter(list, o => _.has(o, 'key'))
  return list
}