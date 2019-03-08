import React from 'react'

import LocalText from 'i18n/LocalText'

import styles from './BriefInfo.scss'

export default function BriefInfo(props) {
  const formattedData = data => {
    if (data === null && typeof null === 'object') {
      return [0, 0, '0/0', 0, '0/0']
    }
    return [
      data.Height,
      data.TxCount,
      `${data.CurrTps}/${data.TopTps}`,
      data.AccountCount,
      `${data.SuperNode}/${data.CandiNode}`
    ]
  }

  return (
    <div className={styles.brief}>
      {formattedData(props.context.data).map((item, i) => {
        return (
          <div key={i} className={styles['brief-item']}>
            <p className={styles['brief-item__title']}>
              <LocalText id={'hbField' + (i + 1)} />
            </p>
            <p className={styles['brief-item__number']}>{item}</p>
          </div>
        )
      })}
    </div>
  )
}
