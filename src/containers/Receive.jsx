import React from 'react'
import { connect } from 'react-redux'

import Banner from 'components/Banner'
import docs from 'constants/docs/wallet'
import index from 'utils/locale'

import styles from './SendReceive.scss'

const NS = 'receive'

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Receive(props) {
  return (
    <div className={styles.main}>
      <Banner title={docs[NS].main[index(props.language)]} />
      <div className={styles.content}>
        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title1[index(props.language)]}
          </p>
          <span className={styles.addr}>
            0x19b685a1b66b4bd65660dbfd274721c2dda8a66a20c8fda8d4150c9a6474569d
          </span>
        </div>
        <div className={styles.field}>
          <p className={styles.title}>
            {docs[NS].title2[index(props.language)]}
          </p>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
})
