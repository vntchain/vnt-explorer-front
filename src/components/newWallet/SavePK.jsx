import React from 'react'
import { Button, Icon, Input } from 'antd'

import styles from './NWallet.scss'

export default function SavePrivateKey(props) {
  const { lang, index, data } = props
  const copy = () => {
    document.querySelector('#copy').select()
    document.execCommand('copy')
  }
  return (
    <div className={`${styles.content} ${styles['content--wider']}`}>
      <h3 className={styles.title}>{data.title[index(lang)]}</h3>
      <Input
        id="copy"
        value="ac5966fdff98014e9c8666d7d4e8fbe2a2b62880e6938d1becedfce74c8aaa29"
        readOnly
        size="large"
        suffix={<Icon onClick={copy} type="copy" />}
      />
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
