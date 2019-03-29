import React from 'react'

import withLang from 'i18n/withLang'
import img1 from 'assets/images/wallet.png'
import img2 from 'assets/images/rectangular.png'

import styles from './Banner.scss'

function Banner(props) {
  return (
    <div className={styles.banner}>
      {props.showWalletImg && (
        <img className={styles.right} src={img1} alt="" />
      )}
      <img className={styles.left} src={img2} alt="" />
      {props.locale[props.language][props.id]}
    </div>
  )
}

export default withLang(Banner)
