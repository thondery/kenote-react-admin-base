import React, { PureComponent } from 'react'
import { Button, Form, Input, InputNumber, Icon, Alert, notification } from 'antd'
import Modal from 'kenote-react-admin-modal'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { passportActions } from 'reduxs'
import _ from 'lodash'
import 'styles/modal.scss'

const FormItem = Form.Item

@Form.create()
export default class EditAdminsGroupModal extends PureComponent {

  state = {
    disabled: true,
    alert: null
  }

  constructor (props) {
    super(props)
    this._Modal = null
    this._Form = null
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  render () {
    const { visible, onCancel, form, modifyPwdPending, ModalOpts } = this.props
    const { getFieldDecorator } = form
    const options = {
      ref: view => this._Modal = view,
      visible: visible,
      onCancel: onCancel,
      title: '编辑管理组',
      footer: [
        <Button
          onClick={() => this._Modal.handleOnCancel()}
          >
          取消
        </Button>,
        <Button
          type="primary"
          //loading={modifyPwdPending}
          onClick={() => this._Modal.handleOnCancel()}
          >
          确定
        </Button>
      ],
      maskClosable: false
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <Modal {...options}>
        <br />
        <Form 
          ref={ view => this._Form = view }
          layout="horizontal" 
          onSubmit={this.handleSubmit}
          >
          {modifyPwdPending ? null : (
            <QueueAnim component="div" type={['bottom', 'top']} leaveReverse>
              {this.state.alert ? this.state.alert : null}
            </QueueAnim>
          )}
          <FormItem 
            {...formItemLayout} 
            label="管理组名称" 
            hasFeedback >
            {getFieldDecorator('group_name', {
              rules: [{ required: true, message: '管理组名称不能为空!' }],
              initialValue: ModalOpts.name
            })(
              <Input />
            )}
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="管理组权级" 
            hasFeedback >
            {getFieldDecorator('group_level', {
              //rules: [{ required: true, message: '管理组名称不能为空!' }],
              initialValue: ModalOpts.level
            })(
              <Input disabled={ModalOpts.lock} />
            )}
            
          </FormItem>
        </Form>
      </Modal>
    )
  }
}