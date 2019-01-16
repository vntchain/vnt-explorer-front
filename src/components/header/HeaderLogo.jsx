import React from 'react'

import logo from 'assets/images/logo.png'
import logoText from 'assets/images/logo-text.png'

import styles from './HeaderLogo.scss'

export default function HeaderLogo() {
  return (
    <div className={styles['logo-box']}>
      <img className={styles['logo-box__icon']} src={logo} alt="vnt logo" />
      <img
        className={styles['logo-box__icon-text']}
        src={logoText}
        alt="vnt chain"
      />
      <span className={styles['logo-box__text']}>TESTNET</span>
    </div>
  )
}
