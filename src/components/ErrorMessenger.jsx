import React from 'react'
import { Alert } from 'antd'

import styles from './ErrorMessenger.scss'

export default function ErrorMessenger(props) {
  return (
    <div className={styles.alert}>
      <Alert
        message="Error"
        description={props.msg}
        type="error"
        showIcon
        closable
      />
    </div>
  )
}
