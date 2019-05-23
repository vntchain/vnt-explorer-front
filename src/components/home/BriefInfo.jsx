import React, { Fragment } from 'react'

import LocalText from 'i18n/LocalText'

import styles from './BriefInfo.scss'

export default function BriefInfo(props) {
  const formattedData = context => {
    const initial = {}
    if (context === null && typeof context === 'object') {
      return initial
    }
    if (typeof context === 'object' && !context.hasOwnProperty('data')) {
      return initial
    }
    if (context !== null && context.hasOwnProperty('error') && context.error) {
      return initial
    }

    return context.data
  }
  const { stats = {}, market = {} } = props.context

  const {
    Height,
    CurrTps,
    TopTps,
    TxCount,
    AccountCount,
    SuperNode,
    CandiNode
  } = formattedData(stats)
  const {
    PriceCny,
    AvailableSupply,
    MarketCapCny,
    PercentChange24h
  } = formattedData(market)

  const renderMarketCapCny = (MarketCapCny, PercentChange24h) => {
    return (
      <span>
        {`¥ ${MarketCapCny} `}
        <span
          className={styles['brief-item__tiny']}
        >{`${PercentChange24h}%`}</span>
      </span>
    )
  }
  const isExist = data => {
    return typeof data !== 'undefined'
  }

  const briefInfoFields = {
    Height: isExist(Height) ? Height : '--',
    TxCount: isExist(TxCount) ? TxCount : '--',
    AccountCount: isExist(AccountCount) ? AccountCount : '--',
    CurrTps:
      isExist(CurrTps) && isExist(TopTps)
        ? `${Math.round(CurrTps * 100) / 100}/${TopTps}`
        : '--/--',
    PriceCny: isExist(PriceCny) ? (
      <Fragment>
        {`¥ ${PriceCny}`}
        <LocalText id={'hbFieldUnit'} />
      </Fragment>
    ) : (
      '--'
    ),
    AvailableSupply: isExist(AvailableSupply) ? `${AvailableSupply} VNT` : '--',
    MarketCapCny:
      isExist(MarketCapCny) && isExist(PercentChange24h)
        ? renderMarketCapCny(MarketCapCny, PercentChange24h)
        : renderMarketCapCny('--', '--'),
    SuperNode:
      isExist(SuperNode) && isExist(CandiNode)
        ? `${SuperNode}/${CandiNode}`
        : '--/--'
  }
  return (
    <div className={styles.brief}>
      {Object.keys(briefInfoFields).map((item, i) => {
        return (
          <div key={i} className={styles['brief-item']}>
            <p className={styles['brief-item__title']}>
              <LocalText id={'hbField' + item} />
            </p>
            <p className={styles['brief-item__number']}>
              {briefInfoFields[item]}
            </p>
          </div>
        )
      })}
    </div>
  )
}
