import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions, passportActions } from 'reduxs'
import { LoginScreen } from 'passport'

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

  componentWillMount () {
    this.props.actions.accessToken()
  }

  componentWillReceiveProps (nextProps) {
    
  }
  
  render () {
    const { children, auth } = this.props
    return (
      <div className={'layout-root'}>
        {auth ? children : <LoginScreen />}
      </div>
    )
  }
}