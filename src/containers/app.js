import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions, passportActions } from 'reduxs'
import { LoginScreen } from 'passport'
import Modal from 'kenote-react-admin-modal'
import * as Modals from 'modals'
import PubSub from 'pubsub-js'

@connect(
  state => ({
    accessTokenPending   : state.Passport.accessTokenPending,
    accessTokenError     : state.Passport.accessTokenError,
    accessTokenMessage   : state.Passport.accessTokenMessage,
    auth                 : state.Passport.auth
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions}, dispatch)
  })
)
export default class App extends PureComponent {

  state = {
    _Modal: null,
    visible: false
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.actions.accessToken()
    PubSub.subscribe('OPEN_MODAL', (msg, data) => {
      this.setState({ _Modal: data, visible: true })
    })
  }

  componentWillReceiveProps (nextProps) {
    
  }
  
  render () {
    const { children, auth } = this.props
    const RootModal = Modals[this.state._Modal]
    return (
      <div className={'layout-root'}>
        {auth ? children : <LoginScreen />}
        {RootModal && (
          <RootModal 
            visible={this.state.visible} 
            onCancel={() => this.setState({ _Modal: null, visible: false })} 
            />
        )}
      </div>
    )
  }
}