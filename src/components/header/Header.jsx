import React from 'react'
import { connect } from 'react-redux'

import HeaderLogo from './HeaderLogo'
import HeaderMenu from './HeaderMenu'
import HeaderInput from './HeaderInput'
import HeaderLang from './HeaderLang'
import MobileHeaderMenu from './MobileHeaderMenu'

import styles from './Header.scss'

const mapStateToProps = ({ global: { language }, auth: { auth } }) => {
  return {
    language,
    auth
  }
}

export default connect(mapStateToProps)(function Header(props) {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderMenu
        lang={props.language}
        auth={props.auth}
        dispatch={props.dispatch}
      />
      <HeaderInput lang={props.language} />
      <HeaderLang lang={props.language} dispatch={props.dispatch} />

      <MobileHeaderMenu
        lang={props.language}
        dispatch={props.dispatch}
        auth={props.auth}
      />
    </div>
  )
})
