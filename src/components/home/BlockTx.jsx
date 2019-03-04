import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import calcAge from 'utils/age'

import styles from './BlockTx.scss'

const fields = {
  block: ['区块', 'Blocks'],
  tx: ['交易', 'Transfers'],
  viewAll: ['查看全部', 'View All'],
  blockItem: [
    [],
    ['交易数', 'Transactions'],
    ['区块奖励', 'Block Reward'],
    [],
    ['出块者', 'Produced by'],
    'block'
  ],
  txItem: [
    [],
    ['发送方', 'From'],
    ['接收方', 'To'],
    ['数额', 'Amount'],
    [],
    'swap'
  ]
}

export default function BlockTx(props) {
  return (
    <div className={styles['block-tx']}>
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.header__title}>
            <span>
              <LocalText id="lTitle" />
            </span>
          </div>
          <span>
            <Link to="">
              <LocalText id="lField1" />
            </Link>
          </span>
        </div>

        {props.data.blocks.map((item, i) => (
          <div className={styles.content} key={JSON.stringify(item) + i}>
            <div className={styles.item}>
              <div
                className={`${styles['item__row']} ${styles['item__row--1']}`}
              >
                <Icon type={fields.blockItem[fields.blockItem.length - 1]} />
                <span>{'#' + item[0]}</span>
              </div>

              <div
                className={`${styles['item__row']} ${styles['item__row--2']}`}
              >
                <span>
                  <LocalText id="lField2" />
                  {item[1]}
                </span>
                <span>
                  <LocalText id="lField3" />
                  {item[2]}
                </span>
              </div>

              <div
                className={`${styles['item__row']} ${styles['item__row--3']}`}
              >
                <span>{calcAge(item[3], props.lang)}</span>
                <span>
                  <LocalText id="lField4" />
                  <Link to="">{`${item[4]}`}</Link>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

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

        {props.data.txs.map((item, i) => (
          <div className={styles.content} key={JSON.stringify(item) + i}>
            <div className={styles.item}>
              <div
                className={`${styles['item__row']} ${styles['item__row--1']}`}
              >
                <Icon type={fields.txItem[fields.txItem.length - 1]} />
                <span>{item[0].slice(0, 24) + '...'}</span>
              </div>

              <div
                className={`${styles['item__row']} ${
                  styles['item__row--resp']
                }`}
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
    </div>
  )
}
