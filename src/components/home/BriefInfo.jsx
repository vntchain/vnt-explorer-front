import React from 'react'

import LocalText from 'i18n/LocalText'

import styles from './BriefInfo.scss'

export default function BriefInfo(props) {
  const initial = ['--', '--', '--/--', '--', '--/--']
  const formattedData = context => {
    if (context === null && typeof context === 'object') {
      return initial
    }
    if (typeof context === 'object' && !context.hasOwnProperty('data')) {
      return initial
    }
    if (context !== null && context.hasOwnProperty('error') && context.error) {
      return initial
    }
    const { data } = context

    return [
      data.Height,
      data.TxCount,
      `${Math.round(data.CurrTps * 100) / 100}/${data.TopTps}`,
      data.AccountCount,
      `${data.SuperNode}/${data.CandiNode}`
    ]
  }

  return (
    <div className={styles.brief}>
      {formattedData(props.context).map((item, i) => {
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
