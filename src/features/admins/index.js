import React from 'react'
import { getMenuSub } from 'services/utils'
import { Icon } from 'antd'
import AdminsGroup from './group'

const routes = {
  path: '/admins',
  name: '帐号管理',
  childRoutes: [
    //{ path: 'default', name: 'Home', component: Screen, isIndex: true },
    { 
      path: 'group', 
      name: '管理组设定', 
      component: AdminsGroup, 
      flags: [
        { label: '页面访问', value: '9001' },
        { label: '编辑组信息', value: '9002' },
        { label: '修改组权限', value: '9003' },
        { label: '删除组', value: '9004' },
      ] 
    },
  ]
}

export default routes

export const menuSub = getMenuSub(routes, {
    key:   `admins`, 
    name:  `帐号管理`, 
    icon:  <Icon type="solution" />
  })