import React from 'react'
import { connect } from 'react-redux'

import BriefInfo from 'components/home/BriefInfo'
import BlockTx from 'components/home/BlockTx'
import TxChart from 'components/home/TxChart'

import styles from './Home.scss'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Home(props) {
  return (
    <div className={styles.home}>
      <BriefInfo
        lang={props.language}
        data={[1234567, 123456789, '18/211', 123456, '21/100']}
      />
      <BlockTx
        lang={props.language}
        data={{
          blocks: Array(5).fill([12345, 12, 123.45, 13, 'abcdefg']),
          txs: Array(5).fill([
            '0xc8ee61a9b3268ada9e8a79ad43270xc8ee61a9b3268ada9e8a79ad4327',
            '0x55111aa4fc9ee0x55111aa4fc9ee',
            '0x55111aa4fc9ee0x55111aa4fc9ee',
            123.13,
            12
          ])
        }}
      />
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
