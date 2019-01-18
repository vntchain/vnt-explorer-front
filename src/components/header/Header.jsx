import React from 'react'
import { connect } from 'react-redux'

import HeaderLogo from './HeaderLogo'
import HeaderMenu from './HeaderMenu'
import HeaderInput from './HeaderInput'
import HeaderLang from './HeaderLang'
import MobileHeaderMenu from './MobileHeaderMenu'

import styles from './Header.scss'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Header(props) {
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderMenu lang={props.language} />
      <HeaderInput lang={props.language} />
      <HeaderLang lang={props.language} dispatch={props.dispatch} />
      <MobileHeaderMenu lang={props.language} dispatch={props.dispatch} />
    </div>
  )
})
