import React from 'react'
import Screen from './screen'
import { getMenuSub } from 'services/utils'
import { Icon } from 'antd'

const routes = {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default', name: 'Home', component: Screen, isIndex: true },
  ]
}

export default routes

export const menuSub = getMenuSub(routes, {
    key:   `home`, 
    name:  `主页`, 
    icon:  <Icon type="home" />
  })