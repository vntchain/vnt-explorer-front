import React from 'react'
import { Link } from 'react-router-dom'

import logo from 'assets/images/logo.png'

import styles from './HeaderLogo.scss'

export default function HeaderLogo() {
  return (
    <div className={styles['logo-box']}>
      <Link to="/">
        <img className={styles['logo-box__icon']} src={logo} alt="vnt logo" />
        <span className={styles['logo-box__text']}>TESTNET</span>
      </Link>
    </div>
  )
}
