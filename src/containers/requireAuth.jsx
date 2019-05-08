import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import r from 'constants/routes'

function requireAuth(WrappedComponent) {
  const mapStateToProps = ({ auth: { auth } }) => {
    return {
      auth
    }
  }
  return connect(mapStateToProps)(function(props) {
    if (!props.auth) {
      props.dispatch(push(r['open-wallet']))
    }
    return props.auth ? <WrappedComponent /> : null
  })
}

export default requireAuth
