import React, { Component } from 'react'
import { Button, Form, Input, Checkbox, Icon, Alert, notification } from 'antd'
import Modal from 'kenote-react-admin-modal'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { adminsGroupActions } from 'reduxs'
import _ from 'lodash'
import 'styles/modal.scss'
import { getRoutes } from 'services/utils'
import * as Features from 'features'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const AllFlags = getAllFlag()

@connect(
  state => ({
    setFlagPending     : state.AdminsGroup.setFlagPending,
    setFlagError       : state.AdminsGroup.setFlagError,
    setFlagMessage     : state.AdminsGroup.setFlagMessage,
    listData           : state.AdminsGroup.listData
  }),
  dispatch => ({
    actions: bindActionCreators({...adminsGroupActions}, dispatch)
  })
)
@Form.create()
export default class FlagAdminsGroupModal extends Component {

  constructor (props) {
    super(props)
    const { ModalOpts, listData } = props
    const groupInfo = getGroupInfo(listData, ModalOpts.id)
    const { indeterminate, checkAll } = getCheckAllInfo(groupInfo.flag)
    this.state = {
      disabled: true,
      alert: null,
      indeterminate: indeterminate || {},
      checkAll: checkAll || {},
      checkList: groupInfo.flag || []
    }
    this._Modal = null
    this._Form = null
    this.handleChange = this.handleChange.bind(this)
    //this.handleCheckAllChange = this.handleCheckAllChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps (nextProps) {
    const { setFlagError, setFlagMessage } = nextProps
    if (setFlagError > 0 && setFlagMessage !== this.props.setFlagMessage) {
      this.setState({ alert: (
        <Alert
          style={{ margin: '0 40px 24px' }}
          message={setFlagMessage}
          type="error"
          showIcon
          key="aaa"
        />
      )})
    }
    if (setFlagError === 0 && setFlagMessage !== this.props.setFlagMessage) {
      this._Modal.handleOnCancel()
      notification.info({
        message: `系统提示`,
        description: `用户组权限更新成功！`,
        duration: 8,
        placement: 'bottomRight'
      })
    }
  }
  
  render () {
    const { visible, onCancel, form, setFlagPending, ModalOpts, listData } = this.props
    const { getFieldDecorator } = form
    const groupInfo = getGroupInfo(listData, ModalOpts.id)
    const CheckAll = isCheckAll(this.state.checkList, AllFlags)
    const options = {
      ref: view => this._Modal = view,
      visible: visible,
      onCancel: onCancel,
      title: `编辑组权限 -- ${groupInfo.name}`,
      footer: [
        <Button
          onClick={() => this._Modal.handleOnCancel()}
          >
          取消
        </Button>,
        <Button
          type="primary"
          loading={setFlagPending}
          onClick={this.handleSubmit}
          >
          确定
        </Button>
      ],
      tips: (
        <Checkbox
          indeterminate={this.state.checkList.length > 0 && !CheckAll}
          checked={CheckAll}
          onChange={this.handleCheckAllChange.bind(this, 'all')}
          >
          全选
        </Checkbox>
      ),
      width: 800,
      height: 600,
      maskClosable: false
    }
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16, offset: 2 },
    }
    
    return (
      <Modal {...options}>
        <Form 
          ref={ view => this._Form = view }
          layout="horizontal" 
          onSubmit={this.handleSubmit}
          >
          {setFlagPending ? null : (
            <QueueAnim component="div" type={['bottom', 'top']} leaveReverse>
              {this.state.alert ? this.state.alert : null}
            </QueueAnim>
          )}
          {this.renderSectionBox()}
        </Form>
      </Modal>
    )
  }

  renderSectionBox () {
    let routers = getRoutes(Features)
    return routers && routers.map((item, i) => {
      if (!_.find(item.childRoutes, o => o.flags)) return
      let indeterminate = this.state.indeterminate
      let checkAll = this.state.checkAll
      return (
        <section key={i} className="box-meta">
          <div className="box-title">
            <Checkbox
              indeterminate={indeterminate[item.path] && !checkAll[item.path]}
              checked={checkAll[item.path]}
              onChange={this.handleCheckAllChange.bind(this, item.path)}
              >
              {item.name}
            </Checkbox>
          </div>
          {this.renderSectionFormItem(item.childRoutes)}
        </section>
      )
    })
  }

  renderSectionFormItem (childRoutes) {
    const { form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16, offset: 2 },
    }
    return childRoutes && childRoutes.map((item, i) => {
      if (/^\//.test(item.path)) return
      return item.flags && (
        <FormItem 
          key={i}
          {...formItemLayout} 
          label={item.name} 
          >
          <div  style={{ marginTop: 5 }}>
          {getFieldDecorator('flag', {
            initialValue: this.state.checkList //ModalOpts.flag
          })(
            <CheckboxGroup options={item.flags} onChange={this.handleChange} />
          )}
          </div>
        </FormItem>
      )
    })
  }

  handleChange (e) {
    let routers = getRoutes(Features)
    let indeterminate = {}
    let checkAll = {}
    for (let evt of routers) {
      let sectionFlag = getSectionFlag(evt.childRoutes)
      indeterminate[evt.path] = isIndeterminate(e, sectionFlag)
      checkAll[evt.path] = isCheckAll(e, sectionFlag)
    }
    this.setState({ indeterminate, checkAll, checkList: e })
  }

  handleCheckAllChange (key, e) {
    const { form } = this.props
    const { setFieldsValue } = form
    let routers = getRoutes(Features)
    let indeterminate = this.state.indeterminate
    let checkAll = this.state.checkAll
    let checkList = this.state.checkList
    if (key === 'all') {
      for (let item of routers) {
        let sectionFlag = getSectionFlag(item.childRoutes)
        if (sectionFlag.length > 0) {
          indeterminate[item.path] = e.target.checked
          checkAll[item.path] = e.target.checked
          checkList = e.target.checked ? AllFlags : []
        }
      }
    }
    else {
      let sectionFlag = getSectionFlag(_.find(routers, { path: key }).childRoutes)
      indeterminate[key] = e.target.checked
      checkAll[key] = e.target.checked
      if (e.target.checked) {
        checkList = _.uniq(_.concat(checkList, sectionFlag))
      }
      else {
        _.remove(checkList, n => sectionFlag.indexOf(n) > -1)
      }
    }
    setFieldsValue({ flag: checkList })
    this.setState({ indeterminate, checkAll, checkList })
  }
  
  handleSubmit (e) {
    e && e.preventDefault()
    const { ModalOpts } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(ModalOpts.id, values)
        this.props.actions.setFlag(ModalOpts.id, values.flag)
      }
    })
  }
}

function getSectionFlag (childRoutes) {
  let list = []
  for (let e of childRoutes) {
    if (/^\//.test(e.path)) continue
    if (e.flags) {
      list = _.concat(list, _.map(e.flags, 'value'))
    }
  }
  return _.uniq(list)
}

function getAllFlag () {
  let routers = getRoutes(Features)
  let list = []
  for (let item of routers) {
    for (let e of item.childRoutes) {
      if (/^\//.test(e.path)) continue
      if (e.flags) {
        list = _.concat(list, _.map(e.flags, 'value'))
      }
    }
  }
  return list
}

function isIndeterminate (values, sectionFlag) {
  for (let e of values) {
    if (sectionFlag.indexOf(e) > -1) return true
  }
  return false
}

function isCheckAll (values, sectionFlag) {
  for (let e of sectionFlag) {
    if (values.indexOf(e) === -1) return false
  }
  return true
}

function getCheckList (values, sectionFlag) {
  let list = []
  for (let e of sectionFlag) {
    (values.indexOf(e) > -1) && list.push(e)
  }
  return list
}

function getCheckAllInfo (checkList) {
  let routers = getRoutes(Features)
  let indeterminate = {}
  let checkAll = {}
  for (let evt of routers) {
    let sectionFlag = getSectionFlag(evt.childRoutes)
    indeterminate[evt.path] = isIndeterminate(checkList, sectionFlag)
    checkAll[evt.path] = isCheckAll(checkList, sectionFlag)
  }
  return { indeterminate, checkAll }
}

function getGroupInfo (listData, id) {
  return _.find(listData, { _id: id })
}