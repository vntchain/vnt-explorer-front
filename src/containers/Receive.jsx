import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import LocalText from 'i18n/LocalText'
import Margin from 'components/Margin'
import Banner from 'components/Banner'
import genQRCode from 'utils/genQRCode'

import styles from 'containers/SendReceive.scss'

const mapStateToProps = ({ auth: { account } }) => {
  return {
    account
  }
}

export default connect(mapStateToProps)(function Receive(props) {
  const [imgSrc, setImgSrc] = useState('')
  useEffect(() => {
    getImgSrc(props.account.address)
  }, [])
  const getImgSrc = async address => {
    const src = await genQRCode(address)
    setImgSrc(src)
  }
  return (
    <div className={styles.main}>
      <Banner id="rpBanner" />
      <Margin />

      <div className={styles.content}>
        <div className={styles.field}>
          <p className={styles.title}>
            <LocalText id="rpTitle1" />
          </p>
          <span className={styles.addr}>{props.account.address}</span>
        </div>

        <div className={styles.field}>
          <p className={styles.title}>
            <LocalText id="rpTitle2" />
          </p>
          <img className={styles.qrcode} src={imgSrc} alt="" />
        </div>
      </div>
    </div>
  )
})
