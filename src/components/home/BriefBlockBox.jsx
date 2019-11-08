import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import apis from 'utils/apis'
import CountDown from './CountDown'
import { blockIcon } from 'utils/images.js'
import styles from './BlockTx.scss'

export default withLang(function BlockBrief(props) {
  console.warn(props.data, props) //eslint-disable-line
  const formattedData = data => {
    return data.slice(0, 5).map(item => {
      let blockReward, reward, fee
      if (item.Reward > 0) {
        reward = item.Reward.toPrecision(7)
        fee = item.Fee.toPrecision(7)
        blockReward = (item.Reward + item.Fee).toPrecision(7) + ' VNT '
      } else {
        let start = item.BlockReward.indexOf('(')
        let end = item.BlockReward.indexOf(')')
        blockReward = item.BlockReward.slice(0, start)
        let splitArr = item.BlockReward.slice(start + 1, end).split('+')
        reward = splitArr[0].trim()
        fee = splitArr[1].trim()
      }
      return {
        blockHeight: item.Number,
        timeStamp: item.TimeStamp,
        txCount: item.TxCount,
        blockReward: blockReward,
        reward: reward,
        fee: fee,
        producer: {
          addr: item.Producer,
          name:
            (item.ProducerDetail && item.ProducerDetail.Vname) || item.Producer
        }
      }
    })
  }

  const txCountTooltip = <LocalText id="lField5" />

  const blockRewardTooltip = <LocalText id="lField6" />

  const txnFeesTooltip = <LocalText id="lField7" />

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
                {item.blockReward + '('}
                <Tooltip title={blockRewardTooltip} placement="bottom">
                  {item.reward}
                </Tooltip>
                {' + '}
                <Tooltip title={txnFeesTooltip} placement="bottom">
                  {item.fee}
                </Tooltip>
                {')'}
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
