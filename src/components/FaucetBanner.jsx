import React from 'react'

import withLang from 'i18n/withLang'
import arrow from 'assets/images/faucet/arrow.png'
import styles from './FaucetBanner.scss'

function FaucetBanner(props) {
  return (
    <div className={styles.faucetBanner}>
      <span className={styles.mainTitle}>
        {props.locale[props.language][props.mainTitle]}
      </span>
      <div className={styles.subTitle}>
        <span>{props.locale[props.language][props.subTitle]}</span>
        <img src={arrow} alt="" />
      </div>
    </div>
  )
}

export default withLang(FaucetBanner)
