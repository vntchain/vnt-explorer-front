import React from 'react'
import { connect } from 'react-redux'

import HeaderLogo from './HeaderLogo'
import HeaderVote from './HeaderVote'
import HeaderMenu from './HeaderMenu'
import HeaderDropdown from './HeaderDropdown'
import HeaderInput from './HeaderInput'
import HeaderLangSelector from './HeaderLang'
import MobileHeaderMenu from './MobileHeaderMenu'
import menu, { headerLang, vntNetMenu, moreMenu, testMenu } from 'utils/menu.js'

import styles from './Header.scss'

const mapStateToProps = ({ global: { isMobile }, auth: { auth } }) => {
  return {
    isMobile,
    auth
  }
}

export default connect(mapStateToProps)(function Header(props) {
  const isTestEnv = process.env.REACT_APP_NET === 'testnet'
  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderVote />
      <HeaderMenu auth={props.auth} dispatch={props.dispatch} menu={isTestEnv ? testMenu : menu} />
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
