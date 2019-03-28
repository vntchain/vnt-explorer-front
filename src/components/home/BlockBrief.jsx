import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import apis from 'utils/apis'
import { calcAge } from 'utils/time'
import withLang from 'i18n/withLang'

import blockIcon from 'assets/images/icon-block.png'
import styles from './BlockTx.scss'

export default withLang(function BlockBrief(props) {
  const formattedData = data => {
    return data.map(item => ({
      blockHeight: item.Number,
      timeStamp: item.TimeStamp,
      txCount: item.TxCount,
      blockReward: item.BlockReward,
      producer: item.Producer
    }))
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span>
            <LocalText id="lTitle" />
          </span>
        </div>

        {props.context &&
          props.context.data &&
          props.context.data.length && (
            <span>
              <Link to={apis.blocks}>
                <LocalText id="lField1" />
              </Link>
            </span>
          )}
      </div>

      {props.context &&
        props.context.error && <Fragment>{props.errComp}</Fragment>}

      {props.context &&
        props.context.data &&
        props.context.data.length && (
          <Fragment>
            {formattedData(props.context.data).map((item, i) => (
              <div className={styles.content} key={JSON.stringify(item) + i}>
                <div className={styles.item}>
                  <div
                    className={`${styles['item__row']} ${
                      styles['item__row--1']
                    }`}
                  >
                    <img src={blockIcon} alt="" />
                    <span>{'#' + item.blockHeight}</span>
                  </div>

                  <div
                    className={`${styles['item__row']} ${
                      styles['item__row--2']
                    }`}
                  >
                    <span>
                      <LocalText id="lField2" />
                      {item.txCount}
                    </span>
                    <span>
                      <LocalText id="lField3" />
                      {item.blockReward}
                    </span>
                  </div>

                  <div
                    className={`${styles['item__row']} ${
                      styles['item__row--3']
                    }`}
                  >
                    <span>{calcAge(item.timeStamp, props.language)}</span>
                    <span>
                      <LocalText id="lField4" />
                      <Link to={`/account/${item.producer}`}>{`${
                        item.producer
                      }`}</Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )}
    </div>
  )
})
