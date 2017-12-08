import React, { PureComponent } from 'react'
import { Form, Input, Icon, Checkbox, Button, Alert } from 'antd'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { passportActions } from 'reduxs'
import { Screen } from 'kenote-react-admin-passport'
import 'styles/passport.scss'

const FormItem = Form.Item

@connect(
  state => ({
    loginPending   : state.Passport.loginPending,
    loginError     : state.Passport.loginError,
    loginMessage   : state.Passport.loginMessage,
    auth           : state.Passport.auth
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions}, dispatch)
  })
)
@Form.create()
export default class LoginScreen extends PureComponent {

  state = {
    alert: null
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps (nextProps) {
    const { loginError, loginMessage } = nextProps
    if (loginError > 0 && loginMessage !== this.props.loginMessage) {
      this.setState({ alert: (
        <Alert
          style={{ marginBottom: 24 }}
          message={loginMessage}
          type="error"
          showIcon
          key="aaa"
        />
      )})
    }
  }

  render () {
    const { form, loginPending } = this.props
    const { getFieldDecorator } = form
    return (
      <Screen>
        <Form onSubmit={this.handleSubmit}>
        <QueueAnim component="div" delay={600} duration={900} interval={400} type={['right', 'left']}>
          
          {loginPending ? null : (
            <QueueAnim component="div" type={['bottom', 'top']} leaveReverse>
              {this.state.alert ? this.state.alert : null}
            </QueueAnim>
          )}
          <FormItem key="a">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
              //initialValue: undefined
            })(
              <Input 
                size="large"
                prefix={<Icon type={'user'} className="prefixIcon" />} 
                autoComplete="off"
                placeholder={'用户名'} />
            )}
          </FormItem>
          <FormItem key="b">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
              //initialValue: undefined
            })(
              <Input 
                size="large"
                prefix={<Icon type={'lock'} className="prefixIcon" />} 
                type={'password'} 
                autoComplete="off"
                placeholder={'密 码'} />
            )}
          </FormItem>
          <FormItem className="additional" key="c">
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox >自动登录</Checkbox>
            )}
            <a className="forgot" href="">忘记密码</a>
            <Button size="large" loading={loginPending} className="submit" type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </QueueAnim>
        </Form>
      </Screen>
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let { username, password } = values
        this.props.actions.login({ username, password })
      }
    })
    /*this.setState({ alert: (
      <Alert
        style={{ marginBottom: 24 }}
        message={'账户或密码错误'}
        type="error"
        showIcon
        key="a"
      />
    )})*/
  }
  
}