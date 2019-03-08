import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'

import calcAge from 'utils/age'

import styles from './BlockTx.scss'

export default function TxBrief(props) {
  return (
    <div className={`${styles.section} ${styles['section--2']}`}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span>
            <LocalText id="rTitle" />
          </span>
        </div>
        <span>
          <Link to="">
            <LocalText id="rField1" />
          </Link>
        </span>
      </div>

      {props.dataTemp.map((item, i) => (
        <div className={styles.content} key={JSON.stringify(item) + i}>
          <div className={styles.item}>
            <div className={`${styles['item__row']} ${styles['item__row--1']}`}>
              <Icon type="swap" />
              <span>{item[0].slice(0, 24) + '...'}</span>
            </div>

            <div
              className={`${styles['item__row']} ${styles['item__row--resp']}`}
            >
              <span>
                <LocalText id="rField2" />
                <Link to="">{item[1].slice(0, 15) + '...'}</Link>
              </span>
              <span>
                <LocalText id="rField3" />
                <Link to="">{item[2].slice(0, 15) + '...'}</Link>
              </span>
              <span>
                <LocalText id="rField4" />
                {item[3]}
              </span>
              <span>{calcAge(item[4], props.lang)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
