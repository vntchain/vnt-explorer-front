import React from 'react'
import FooterLogo from './FooterLogo'
import FooterInput from './FooterInput'
import FooterNav from './FooterNav'
import FooterSocial from './FooterSocial'

import LocalText from 'i18n/LocalText'
import styles from './Footer.scss'

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.flexWrap}>
        <FooterLogo />
        <FooterNav />
      </div>
      <p>
        <LocalText id="subscribe_hint" />
      </p>
      <div className={styles.flexWrap}>
        <FooterInput />
        <FooterSocial />
      </div>
      <div className={styles.copyRight}>
        @VNT Chain 2019 all rights reserved
      </div>
    </div>
  )
}

export default Footer
