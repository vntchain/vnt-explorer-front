import React from 'react'
import withLang from 'i18n/withLang'

import styles from 'components/TitleNew.scss'

export default withLang(function Title(props) {
  // 某区块下的交易数的 subtitle
  let prefix = props.subTitle,
    value = ''
  if (props.prefix) {
    let t = props.prefix.split('=')[0].slice(1)
    t = t.replace(/\b\w/g, l => l.toUpperCase())
    prefix += t
    value = props.prefix.split('=')[1]
  }

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
        {props.prefix && props.locale[props.language][prefix](value)}
        {props.locale[props.language][props.subTitle](props.count)}
      </p>
    </div>
  )
})
