import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import apis from 'utils/apis'
import CountDown from './CountDown'

import blockIcon from 'assets/images/icon-block.png'
import styles from './BlockTx.scss'

export default withLang(function BlockBrief(props) {
  const formattedData = data => {
    return data.map(item => ({
      blockHeight: item.Number,
      timeStamp: item.TimeStamp,
      txCount: item.TxCount,
      blockReward: item.BlockReward,
      producer: {
        addr: item.Producer,
        name:
          (item.ProducerDetail && item.ProducerDetail.Vname) || item.Producer
      }
    }))
  }

  const txCountTooltip = <LocalText id="lField5" />

  //const blockRewardTooltip = <LocalText id="lField6" />

  //const txnFeesTooltip = <LocalText id="lField7" />

  return (
    <Fragment>
      {formattedData(props.data).map((item, i) => (
        <div className={styles.content} key={JSON.stringify(item) + i}>
          <div className={styles.item}>
            <div className={`${styles['item__row']} ${styles['item__row--1']}`}>
              <img className={styles.icon} src={blockIcon} alt="" />
              <span>
                <Link to={`${apis.block}/${item.blockHeight}`}>
                  {'#' + item.blockHeight}
                </Link>
              </span>
            </div>

            <div className={`${styles['item__row']} ${styles['item__row--2']}`}>
              <span>
                <Tooltip title={txCountTooltip} placement="bottomLeft">
                  <LocalText id="lField2" />
                  {item.txCount > 0 ? (
                    <Link to={`/txs/block=${item.blockHeight}`}>
                      {item.txCount}
                    </Link>
                  ) : (
                    item.txCount
                  )}
                </Tooltip>
              </span>
              <span>
                <LocalText id="lField3" />
                {item.blockReward}
              </span>
            </div>

            <div className={`${styles['item__row']} ${styles['item__row--3']}`}>
              <CountDown orignTime={item.timeStamp} language={props.language} />
              <span>
                <LocalText id="lField4" />
                <Link to={`/account/${item.producer.addr}`}>{`${
                  item.producer.name.length > 18
                    ? item.producer.name.slice(0, 16) + '...'
                    : item.producer.name
                }`}</Link>
              </span>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
})
