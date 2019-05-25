import React, { Fragment } from 'react'

import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'

import { blockBriefLogo } from 'utils/images'

import styles from './BriefInfo.scss'

export default withLang(function BriefInfo(props) {
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
    PriceUsd,
    AvailableSupply,
    MarketCapCny,
    MarketCapUsd,
    PercentChange24h
  } = formattedData(market)

  const renderMarketCapCny = (MarketCapCny, PercentChange24h) => {
    return (
      <div style={{ display: 'flex', alignItems: 'bottom' }}>
        <span>
          <LocalText id={'hbFieldFlag'} />
          {props.language === 'cn' ? `${MarketCapCny}` : `${MarketCapUsd}`}
        </span>
        <span
          className={styles['brief-item__tiny']}
        >{`${PercentChange24h}%`}</span>
      </div>
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
        <LocalText id={'hbFieldFlag'} />
        {props.language === 'cn' ? `${PriceCny}` : `${PriceUsd}`}
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
            <div className={styles['brief-item__number']}>
              {briefInfoFields[item]}
            </div>
            <div className={styles['brief-item__title']}>
              <LocalText id={'hbField' + item} />
            </div>
            <div className={styles['brief-item__img']}>
              <img alt="" src={blockBriefLogo[i].src} />
            </div>
          </div>
        )
      })}
    </div>
  )
})
