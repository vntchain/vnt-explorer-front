import React from 'react'
import { connect } from 'react-redux'

import BriefInfo from 'components/home/BriefInfo'
import BlockTx from 'components/home/BlockTx'

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
    </div>
  )
})
