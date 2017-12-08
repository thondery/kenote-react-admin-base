import React, { PureComponent } from 'react'
import CoreLayout from 'containers/layout'
import { Table, Button, Icon } from 'antd'
import PubSub from 'pubsub-js'

export default class AdminsGroup extends PureComponent {

  render () {
    const { location } = this.props
    const options = {
      location,
      pageCode: '9001',
      breadcrumb: [
        { name: '主页' },
        { name: '帐号管理' },
        { name: '管理组设定' }
      ]
    }
    const columns = [

    ]
    const data = [

    ]
    return (
      <CoreLayout {...options}>
        <div>
          <Button onClick={() => PubSub.publish('OPEN_MODAL', 'AddAdminsGroupModal')}>
            创建管理组
          </Button>
        </div>
        <Icon type="loading" />
        <Table columns={columns} dataSource={data} />
      </CoreLayout>
    )
  }
}