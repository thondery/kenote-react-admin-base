import React from 'react'
import Screen from './screen'
import { getMenuSub } from 'services/utils'
import { Icon } from 'antd'

const routes = {
  path: '/',
  name: '主页',
  childRoutes: [
    { 
      path: 'default', 
      name: '主页', 
      component: Screen, 
      isIndex: true,
      flags: [
        { label: '页面访问', value: '1001' },
      ]
    },
  ]
}

export default routes

export const menuSub = getMenuSub(routes, {
    key:   `home`, 
    //name:  `主页`, 
    icon:  <Icon type="home" />
  })