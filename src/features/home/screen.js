// ------------------------------------
// Screen -- Home
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions } from 'reduxs'
import { Button, Icon } from 'antd'
import { HttpServices } from 'services/utils'

@connect(
  state => ({
    initialPending:     state.Root.initialPending,
    initialError:     state.Root.initialError,
    initialMessage:     state.Root.initialMessage,
    auth:     state.Root.auth
  }),
  dispatch => ({
    actions: bindActionCreators({...rootActions}, dispatch)
  })
)
export default class Home extends PureComponent {
  
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    
  }
  
  render() {
    const { location, auth, initialPending } = this.props
    return (
      <div>
        <span>::welcome:: => '{initialPending ? (
          <Icon type="loading" />
        ) : JSON.stringify(auth)}'</span>
        <Button>Button</Button>
      </div>
    )
  }
}