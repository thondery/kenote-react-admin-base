import React, { PureComponent } from 'react'
import CoreLayout from 'containers/layout'
import { Table, Button, Icon, Row, Col, Tooltip, Divider, Input } from 'antd'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { adminsGroupActions } from 'reduxs'
import _ from 'lodash'

@connect(
  state => ({
    getListPending      : state.AdminsGroup.getListPending,
    getListError        : state.AdminsGroup.getListError,
    getListMessage      : state.AdminsGroup.getListMessage,
    listData            : state.AdminsGroup.listData,
  }),
  dispatch => ({
    actions: bindActionCreators({...adminsGroupActions}, dispatch)
  })
)
export default class AdminsGroup extends PureComponent {

  state = {
    
  }

  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    this.props.actions.getlist()
  }

  render () {
    const { location, getListPending, listData } = this.props
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
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        //fixed: 'left'
      },
      {
        title: '管理组',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        //render: (text, record) => this.renderColumns(text, record, 'name') ,
      },
      {
        title: '权级',
        dataIndex: 'level',
        key: 'level',
        width: 100,
        //render: (text, record) => this.renderColumns(text, record, 'level'),
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        //width: 100,
        //render: (text, record) => this.renderColumns(text, record, 'desc'),
        
      },
      {
        title: '操作',
        key: 'action',
        width: 240,
        render: (text, record) => (
          <span>
            <a onClick={() => PubSub.publish('OPEN_MODAL', ['EditAdminsGroupModal', { id: record._id }])}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => PubSub.publish('OPEN_MODAL', ['FlagAdminsGroupModal', { id: record._id }])} disabled={record.lock}>权限</a>
            <Divider type="vertical" />
            <a disabled={record.lock}>删除</a>
          </span>
        )
      },
    ]
    const data = listData
    console.log(('POST: /admins/groups/flag/').match(/([a-f\d]+){24}/))
    return (
      <CoreLayout {...options}>
        <Row style={{ marginBottom: 20 }}>
          <Col span={20}>
            <Button onClick={() => PubSub.publish('OPEN_MODAL', 'AddAdminsGroupModal')}>
              创建管理组
            </Button>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Tooltip title="刷新">
              <Button shape="circle" style={{ border: 0 }} onClick={() => this.props.actions.getlist()}>
                <Icon type="sync" spin={getListPending} />
              </Button>
            </Tooltip>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} loading={getListPending} pagination={true} bordered={false} />
      </CoreLayout>
    )
  }
}