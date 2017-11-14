// ------------------------------------
// Screen -- Home
// ------------------------------------
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions } from 'reduxs'

@connect(
  state => ({
    initialPending:     state.Root.initialPending,
    initialError:     state.Root.initialError,
    initialMessage:     state.Root.initialMessage,
    welcome:     state.Root.welcome
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
    this.props.actions.initial()
  }
  
  render() {
    const { location, welcome } = this.props
    return (
      <div>
        <span>::welcome:: => '{welcome}'</span>
      </div>
    )
  }
}