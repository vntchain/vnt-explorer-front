import React from 'react'
import { Alert } from 'antd'

import styles from './ErrorMessenger.scss'

export default function ErrorMessenger(props) {
  return (
    <div className={styles.alert}>
      {props.context &&
        props.context.error && (
          <Alert
            message="Error"
            description={props.context.error}
            type="error"
            showIcon
            closable
          />
        )}
    </div>
  )
}
