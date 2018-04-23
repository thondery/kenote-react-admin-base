import React from 'react'
import { Sider } from 'components'
import { Icon } from 'antd'
import * as menuSubs from 'features/menuSub'

export default ({ location }) => (
  <Sider 
    {...{ location, menuSubs }}
    footer={ (collapsed) => (
      <div>
        <Icon type="windows" style={!collapsed ? { fontSize: '16px' } : null} />
        {!collapsed && <span>v1.0.0</span>}
      </div>
    )}
  />
)