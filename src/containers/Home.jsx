import React from 'react'
import { connect } from 'react-redux'

import DataProvider from 'containers/RPDataProviderNew'
import RPDataProviderAll from 'containers/RPDataProviderAll'
import BriefInfo from 'components/home/BriefInfo'
import BlockTx from 'components/home/BlockTx'
import TxChart from 'components/home/TxChart'
import Partners from 'components/home/Partners'
import Margin from 'components/Margin'

import apis from 'utils/apis'
// import { pollingInterval } from 'constants/config'

import styles from './Home.scss'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Home() {
  return (
    <div className={styles.home}>
      <RPDataProviderAll
        optionsArr={[
          {
            path: apis.stats,
            ns: 'stats',
            field: 'stats',
            polling: 2 //2s一次
          },
          {
            path: apis.market,
            ns: 'market',
            field: 'market',
            polling: 60 //1min刷新一次(s)
          }
        ]}
        render={data => <BriefInfo context={data} />}
      />
      <Margin size="medium" />
      <BlockTx />
      <Margin size="medium" />
      <DataProvider
        options={{
          path: apis.priceLine,
          ns: 'transactions',
          field: 'txHistory'
        }}
        render={data => <TxChart context={data} />}
      />
      <Margin size="medium" />
      <Partners />
    </div>
  )
})
