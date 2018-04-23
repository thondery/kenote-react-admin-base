import React from 'react'
import { Menu, Dropdown } from 'antd'
import './style.scss'

export default ({ name, data, onPressItem }) => {
  const menuPanel = (
    <Menu 
      className="app-header-menu"
      onClick={onPressItem}
      >
      {data && data.map( (item, i) => {
        return item.type === 'driver' ? (
          <Menu.Divider key={i} className="app-header-menu-driver" />
        ) : (
          <Menu.Item key={item.key} className={'app-header-menu-span'} >
            <span>{item.name}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  )
  return (
    <Dropdown 
      overlay={menuPanel}
      >
      <div className={'app-header-link-div'} >
        <a className={'app-header-link'}>
          <span>{name}</span>
        </a>
      </div>
    </Dropdown>
  )
}