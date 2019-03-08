import React from 'react'
import { connect } from 'react-redux'

import DataProvider from 'containers/RPDataProvider'
import BriefInfo from 'components/home/BriefInfo'
import BlockTx from 'components/home/BlockTx'
import TxChart from 'components/home/TxChart'
import apis from 'utils/apis'
import { pollingInterval } from 'constants/config'

import styles from './Home.scss'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Home() {
  return (
    <div className={styles.home}>
      <DataProvider
        options={{
          path: apis.stats,
          type: 'stats/setStats',
          ns: 'stats',
          polling: pollingInterval
        }}
        render={data => <BriefInfo context={data} />}
      />

      <BlockTx />
      <TxChart
        data={[
          { 数量: 1, time: '11月1日' },
          { 数量: 3, time: '11月2日' },
          { 数量: 4, time: '11月3日' },
          { 数量: 2, time: '11月4日' },
          { 数量: 9, time: '11月5日' },
          { 数量: 5, time: '11月6日' },
          { 数量: 2, time: '11月7日' },
          { 数量: 1, time: '11月8日' },
          { 数量: 3, time: '11月9日' },
          { 数量: 4, time: '11月10日' },
          { 数量: 2, time: '11月11日' },
          { 数量: 9, time: '11月12日' },
          { 数量: 5, time: '11月13日' },
          { 数量: 2, time: '11月14日' }
        ]}
      />
    </div>
  )
})
