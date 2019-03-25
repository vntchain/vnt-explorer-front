import React from 'react'

import withLang from 'i18n/withLang'

import styles from 'components/Count.scss'

export default withLang(function TxCount(props) {
  return (
    <div className={styles.container}>
      <div className={styles.subTitle}>
        {props.context && props.context.data
          ? props.locale[props.language][props.id](props.context.data)
          : ' '}
      </div>
    </div>
  )
})
