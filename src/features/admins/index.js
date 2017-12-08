import React from 'react'
import { getMenuSub } from 'services/utils'
import { Icon } from 'antd'
import AdminsGroup from './group'

const routes = {
  path: '/admins',
  name: 'Admins',
  childRoutes: [
    //{ path: 'default', name: 'Home', component: Screen, isIndex: true },
    { path: 'group', name: '管理组设定', component: AdminsGroup }
  ]
}

export default routes

export const menuSub = getMenuSub(routes, {
    key:   `admins`, 
    name:  `帐号管理`, 
    icon:  <Icon type="solution" />
  })