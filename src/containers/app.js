import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions, passportActions } from 'reduxs'
import { LoginScreen } from 'passport'
import { Icon } from 'antd'
import * as Modals from 'modals'
import PubSub from 'pubsub-js'
import _ from 'lodash'

@connect(
  state => ({
    accessTokenPending   : state.Passport.accessTokenPending,
    accessTokenError     : state.Passport.accessTokenError,
    accessTokenMessage   : state.Passport.accessTokenMessage,
    auth                 : state.Passport.auth,
    initialPending       : state.Root.initialPending,
    initialProgress      : state.Root.initialProgress
  }),
  dispatch => ({
    actions: bindActionCreators({...passportActions, ...rootActions}, dispatch)
  })
)
export default class App extends PureComponent {

  state = {
    _Modal: null,
    _ModalOpts: null,
    visible: false
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.actions.accessToken()
    PubSub.subscribe('OPEN_MODAL', (msg, data) => {
      let options = {
        _Modal: data,
        _ModalOpts: null
      }
      if (_.isArray(data)) {
        options = _.zipObject(['_Modal', '_ModalOpts'], data)
      }
      this.setState({ ...options, visible: true })
    })
  }

  componentWillReceiveProps (nextProps) {
    const { accessTokenPending, initialPending, initialProgress } = nextProps
    if (accessTokenPending) {
      this.props.actions.initialProgress(65, 'begin')
    }
    else {
      if (initialPending) {
        if (initialProgress >= 100) {
          this.props.actions.initialComplete()
        }
        else {
          initialProgress !== this.props.initialProgress && this.props.actions.initialProgress(100, 'end')
        }
      }
    }
  }
  
  render () {
    const { children, auth, initialProgress, initialPending } = this.props
    const RootModal = Modals[this.state._Modal]
    let initialMaskStyle = initialProgress === 100 ? {
      animation: 'hideMask 1.8s'
    } : null
    return (
      <div className={'layout-root'}>
        {initialPending ? (
          <div className={'layout-initial-mask'} style={initialMaskStyle}>
            <Icon type="loading" style={{ color: '#999', marginBottom: 8, fontSize: 24 }} />
            <div className={'progress-span'}>Loading...{`${initialProgress}%`}</div>
            <div className={'layout-progress-bar'}>
              <div className={'progress-bar-container'}>
                <div className={'progress-bar-pending'} style={{ width: `${initialProgress}%` }} />
              </div>
            </div>
          </div>
        ) : (auth ? children : <LoginScreen />)}
        {RootModal && (
          <RootModal 
            visible={this.state.visible}
            ModalOpts={this.state._ModalOpts}
            onCancel={() => this.setState({ _Modal: null, visible: false })} 
            />
        )}
      </div>
    )
  }
}