import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rootActions, passportActions } from 'reduxs'


export default class App extends PureComponent {

  componentWillMount () {
    
  }

  componentWillReceiveProps (nextProps) {
    
  }
  
  render () {
    const { children } = this.props
    return (
      <div className={'layout-root'}>
        {children}
      </div>
    )
  }
}