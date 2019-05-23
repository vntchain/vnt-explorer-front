import React from 'react'
import logo from 'assets/images/footer/footerLogo.png'
import LocalText from 'i18n/LocalText'
import styles from './FooterLogo.scss'

export default function FooterLogo() {
  return (
    <div className={styles.logoBox}>
      <img className={styles['logoBox_icon']} src={logo} alt="vnt logo" />
      <span className={styles['logoBox_text']}>
        <LocalText id="footerLogoText" />
      </span>
    </div>
  )
}
