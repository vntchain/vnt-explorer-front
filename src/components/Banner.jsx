import React from 'react'

import withLang from 'i18n/withLang'

import styles from './Banner.scss'

function Banner(props) {
  return (
    <div className={styles.banner}>
      {props.locale[props.language][props.id]}
    </div>
  )
}

export default withLang(Banner)
