import React from 'react'
import { connect } from 'react-redux'

import HeaderLogo from './HeaderLogo'
import HeaderMenu from './HeaderMenu'
import HeaderDropdown from './HeaderDropdown'
import HeaderInput from './HeaderInput'
import HeaderLangSelector from './HeaderLang'
import MobileHeaderMenu from './MobileHeaderMenu'
import menu, { headerLang, vntNetMenu, moreMenu } from 'utils/menu.js'

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
      <HeaderMenu auth={props.auth} dispatch={props.dispatch} menu={menu} />
      <HeaderDropdown menu={moreMenu} />
      <HeaderInput />
      <HeaderDropdown menu={vntNetMenu} />
      <HeaderLangSelector menu={headerLang} />
      <MobileHeaderMenu
        auth={props.auth}
        dispatch={props.dispatch}
        isMobile={props.isMobile}
      />
    </div>
  )
})
