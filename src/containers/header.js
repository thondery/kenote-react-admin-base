import React, { PureComponent } from 'react'
import { Icon, notification} from 'antd'
import { Header, getMenuList } from 'components'
import Modal from 'kenote-react-admin-modal'
import _ from 'lodash'
import PubSub from 'pubsub-js'

export default class AdminHeader extends PureComponent {

  render () {
    const { auth, actions } = this.props
    const menus = [
      {
        key: 'workorder',
        name: '工单',
        data: [
          {
            key: '1011',
            name: '我的工单'
          },
          {
            key: '1012',
            name: '提交工单'
          }
        ]
      },
      {
        key: 'help',
        name: '支持',
        data: [
          {
            key: '1031',
            name: '帮助与文档'
          },
          {
            key: '1032',
            name: '提交意见'
          },
          {
            key: '1033',
            name: '论坛'
          },
          {
            key: '1034',
            name: '博客'
          }
        ]
      },
      {
        key: 'auth',
        name: `${auth && auth.username || '\<admin\>'}`,
        data: [
          {
            key: '9001',
            name: '基本资料',
            icon: (<Icon type="exception" />),
            onPress: () => {
              PubSub.publish('OPEN_MODAL', 'ModifyPwdModal')
            }
          },
          {
            key: '9002',
            name: '实名认证',
            icon: (<Icon type="contacts" />)
          },
          {
            key: '9003',
            name: '安全设置',
            icon: (<Icon type="setting" />)
          },
          {
            key: '9004',
            name: '安全管控',
            icon: (<Icon type="lock" />)
          },
          {
            key: '9005',
            name: '访问控制',
            icon: (<Icon type="idcard" />)
          },
          {
            key: '9006',
            name: 'accesskeys',
            icon: (<Icon type="key" />)
          },
          {
            key: '9007',
            name: '会员权益',
            icon: (<Icon type="solution" />)
          },
          {
            key: '9008',
            name: '会员积分',
            icon: (<Icon type="solution" />)
          },
          {
            key: '9009',
            name: '云大使管理',
            icon: (<Icon type="cloud-o" />)
          },
          {
            type: 'driver'
          },
          {
            key: '-1',
            name: '退出管理控制台',
            type: 'quit',
            onPress: () => {
              Modal.confirm({
                title: '确定要退出管理控制台吗？',
                onOk() {
                  console.log('quit')
                  return new Promise( (resolve, reject) => {
                    setTimeout(() => resolve(true), 500)
                  })
                  .then( ret => {
                    actions.logout()
                  })
                  
                }
              })
            }
          }
        ]
      },
    ]
    return (
      <Header 
        {...{ auth, menus }}
        onPressItem={ ({ key }) => {
          let list = getMenuList(menus)
          let data = _.find(list, o => o.key === key)
          if (_.has(data, 'onPress')) {
            data.onPress()
          }
          else {
            notification.info({
              message: `Open Menu.Item`,
              description: `您点击了菜单 => [${data.key}]${data.name}`,
              duration: 8,
              placement: 'bottomRight'
            })
          }
        }}
      />
    )
  }
}