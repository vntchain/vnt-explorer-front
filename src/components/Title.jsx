import React from 'react'

import withLang from 'i18n/withLang'

import styles from './Title.scss'

export default withLang(function Title(props) {
  const suffix = props.suffix || ''
  return (
    <div>
      <p className={styles.title}>
        {props.locale[props.language][props.titleID] + suffix}
      </p>

      {props.subTitleID && (
        <p className={styles.subTitle}>
          {props.context && props.context.data
            ? props.locale[props.language][props.subTitleID](props.context.data)
            : ' '}
        </p>
      )}
    </div>
  )
})
