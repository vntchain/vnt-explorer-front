import React from 'react'

import hocLangPasser from 'i18n/hocLangPasser'

import styles from './Banner.scss'

function Banner(props) {
  return (
    <div className={styles.banner}>
      {props.locale[props.language][props.id]}
    </div>
  )
}

export default hocLangPasser(Banner)
