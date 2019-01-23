import React from 'react'
import { Button } from 'antd'

import styles from './NWallet.scss'

export default function SaveKeystore(props) {
  const { lang, index, data } = props
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{data.title[index(lang)]}</h3>
      <Button size="large" type="primary" block>
        {data.buttonName[index(lang)]}
      </Button>
      <ul className={styles.list}>
        {data.notes.map(item => (
          <li key={item[index(lang)]}>{`- ${item[index(lang)]}`}</li>
        ))}
      </ul>
      <Button
        style={{ backgroundColor: '#ff8103', borderColor: '#ff8103' }}
        size="large"
        type="primary"
        block
      >
        {data.buttonNext[index(lang)]}
      </Button>
    </div>
  )
}
