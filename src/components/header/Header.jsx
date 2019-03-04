import React from 'react'
import { connect } from 'react-redux'

import HeaderLogo from './HeaderLogo'
import HeaderMenu from './HeaderMenu'
import HeaderInput from './HeaderInput'
import HeaderLang from './HeaderLang'
import MobileHeaderMenu from './MobileHeaderMenu'

import styles from './Header.scss'

const mapStateToProps = ({ global: { isMobile }, auth: { auth } }) => {
  return {
    isMobile,
    auth
  }
}

export default connect(mapStateToProps)(function Header(props) {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderMenu auth={props.auth} dispatch={props.dispatch} />
      <HeaderInput />
      <HeaderLang />

      <MobileHeaderMenu
        auth={props.auth}
        dispatch={props.dispatch}
        isMobile={props.isMobile}
      />
    </div>
  )
})
