import React from 'react'
import withLang from 'i18n/withLang'

import styles from 'components/TitleNew.scss'

export default withLang(function Title(props) {
  return props.mainTitle ? (
    <div className={styles.container}>
      <p className={styles.main}>
        {props.locale[props.language][props.mainTitle]}
        {props.suffix && <span>{props.suffix}</span>}
      </p>
    </div>
  ) : (
    // invoke with `count` variable
    <div className={styles.container}>
      <p
        className={props.titleUnderTab ? styles['sub__under-tab'] : styles.sub}
      >
        {props.locale[props.language][props.subTitle](props.count)}
      </p>
    </div>
  )
})
