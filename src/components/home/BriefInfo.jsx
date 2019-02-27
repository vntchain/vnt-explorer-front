import React from 'react'

import LocalText from 'i18n/LocalText'

import styles from './BriefInfo.scss'

export default function BriefInfo(props) {
  return (
    <div className={styles.brief}>
      {Array(5)
        .fill('')
        .map((item, i) => (
          <div key={item[0]} className={styles['brief-item']}>
            <p className={styles['brief-item__title']}>
              <LocalText id={'hbField' + (i + 1)} />
            </p>
            <p className={styles['brief-item__number']}>{props.data[i]}</p>
          </div>
        ))}
    </div>
  )
}
