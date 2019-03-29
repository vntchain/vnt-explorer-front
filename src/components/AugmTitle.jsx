import React, { Fragment } from 'react'
import { message } from 'antd'

import withLang from 'i18n/withLang'
import cpIcon from 'assets/images/copy.png'

import styles from './AugmTitle.scss'

export default withLang(function AugmTitle(props) {
  const baseWidth = 81
  const copy = () => {
    document.querySelector('#copy').select()
    document.execCommand('copy')
    message.info('Copied!')
  }
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {props.locale[props.language][props.titleID]}
        {props.suffix && (
          <Fragment>
            <input
              className={styles.input}
              size="large"
              id="copy"
              value={props.suffix}
              readOnly
              style={{ width: `${baseWidth * props.fieldWidth}%` }}
            />
            <img
              onClick={copy}
              className={styles.copy}
              src={cpIcon}
              alt="copy-icon"
            />
          </Fragment>
        )}
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
