import React, { PureComponent } from 'react'
import { Button, Form, Input, Icon, Alert, notification } from 'antd'
import Modal from 'kenote-react-admin-modal'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { passportActions } from 'reduxs'
import _ from 'lodash'
import 'styles/modal.scss'

const FormItem = Form.Item

@connect(
  state => ({
    modifyPwdPending   : state.Passport.modifyPwdPending,
    modifyPwdError     : state.Passport.modifyPwdError,
    modifyPwdMessage   : state.Passport.modifyPwdMessage
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions}, dispatch)
  })
)
@Form.create()
export default class ModifyPwdModal extends PureComponent {

  state = {
    disabled: true,
    alert: null
  }

  constructor (props) {
    super(props)
    this._Modal = null
    this._Form = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkVerifyNewPassword = this.checkVerifyNewPassword.bind(this)
  }

  componentWillMount () {
    console.log('open')
  }
  
  componentWillReceiveProps (nextProps) {
    const { modifyPwdError, modifyPwdMessage } = nextProps
    if (modifyPwdError > 0 && modifyPwdMessage !== this.props.modifyPwdMessage) {
      this.setState({ alert: (
        <Alert
          style={{ margin: '0 40px 24px' }}
          message={modifyPwdMessage}
          type="error"
          showIcon
          key="aaa"
        />
      )})
    }
    if (modifyPwdError === 0 && modifyPwdMessage !== this.props.modifyPwdMessage) {
      this._Modal.handleOnCancel()
      notification.info({
        message: `系统提示`,
        description: `密码修改成功！`,
        duration: 8,
        placement: 'bottomRight'
      })
    }
  }

  render () {
    const { visible, onCancel, form, modifyPwdPending } = this.props
    const { getFieldDecorator } = form
    const options = {
      ref: view => this._Modal = view,
      visible: visible,
      onCancel: onCancel,
      title: '修改密码',
      footer: [
        <Button
          onClick={() => this._Modal.handleOnCancel()}
          >
          取消
        </Button>,
        <Button
          type="primary"
          loading={modifyPwdPending}
          onClick={this.handleSubmit}
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
            label="当前密码" 
            hasFeedback >
            {getFieldDecorator('current_password', {
              rules: [{ required: true, message: '请输入当前密码!' }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="新密码"
            hasFeedback >
            {getFieldDecorator('new_password', {
              rules: [
                { required: true, message: '请输入新密码!' },
                { validator: this.checkNewPassword, message: '密码由数字、字母和符号组成, 且长度保持在6~20字符' }
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem 
            {...formItemLayout} 
            label="确认新密码"
            hasFeedback >
            {getFieldDecorator('verify_new_password', {
              rules: [
                { required: true, message: '请输入确认新密码!' },
                { validator: this.checkVerifyNewPassword, message: '两次输入的新密码不一致' }
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  handleChange (e) {
    this.props.form.validateFields((err, values) => {
      let formFields = { ...values, [e.target.id]: e.target.value }
      let isDisabled = false
      for (let e of _.keys(formFields)) {
        if (!formFields[e]) {
          isDisabled = true
          break
        }
      }
      this.setState({ disabled: isDisabled })
    })
  }

  checkNewPassword (rule, value, callback) {
    if (value && !/^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?]{6,20}$/.test(value)) {
      callback(rule.message)
    }
    callback()
  }

  checkVerifyNewPassword (rule, value, callback) {
    const { form } = this.props
    let newPwd = form.getFieldValue('new_password')
    if (value && value !== newPwd) {
      callback(rule.message)
    }
    callback()
  }

  handleSubmit (e) {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.modifyPwd({
          password: values.current_password,
          newpassword: values.new_password
        })
      }
    })
  }
}