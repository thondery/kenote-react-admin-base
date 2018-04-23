// ------------------------------------
// Screen -- Home
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Icon, Form, Input, InputNumber } from 'antd'
import { HttpServices } from 'services/utils'
import CoreLayout from 'containers/layout'
import { getToken } from 'services/token'

@connect(
  state => ({
    auth:     state.Passport.auth
  }),
  /*dispatch => ({
    actions: bindActionCreators({...rootActions}, dispatch)
  })*/
)
export default class Home extends PureComponent {

  //state = { visible: false }
  
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    
  }
  
  render() {
    const { location, auth } = this.props
    const options = {
      location,
      //pageCode: '1001',
      /*breadcrumb: [
        { name: '主页' }
      ]*/
    }
    return (
      <CoreLayout {...options}>
        {getToken()}
        <InputNumber />{JSON.stringify(process.env)}
      </CoreLayout>
    )
  }
}