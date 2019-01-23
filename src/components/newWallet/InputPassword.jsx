import React from 'react'
import { Button, Input } from 'antd'

import styles from './NWallet.scss'

export default function InputPassword(props) {
  const { lang, index, data } = props
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{data.title[index(lang)]}</h3>
      <ul className={styles.list}>
        {data.notes.map(item => (
          <li key={item[index(lang)]}>{`- ${item[index(lang)]}`}</li>
        ))}
      </ul>
      <Input.Password
        size="large"
        placeholder={data.inputPlaceholder[index(lang)]}
      />
      <Button size="large" type="primary" block>
        {data.buttonName[index(lang)]}
      </Button>
    </div>
  )
}
