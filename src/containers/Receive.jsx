import React from 'react'
import { connect } from 'react-redux'

import LocalText from 'i18n/LocalText'
import Margin from 'components/Margin'
import Banner from 'components/Banner'
import genQRCode from 'utils/genQRCode'
import Copier from 'components/Copier'

import styles from 'containers/SendReceive.scss'

const mapStateToProps = ({ auth: { account } }) => {
  return {
    account
  }
}

export default connect(mapStateToProps)(
  class Receive extends React.Component {
    constructor(props) {
      super(props)
      this.state = { imgSrc: '' }
      this.copyRef = React.createRef()
    }
    componentDidMount() {
      this.getImgSrc(this.props.account.address)
    }
    getImgSrc = async address => {
      const src = await genQRCode(address)
      this.setState({
        imgSrc: src
      })
    }
    render() {
      return (
        <div className={styles.main}>
          <Banner id="rpBanner" />
          <Margin />

          <div className={styles.content}>
            <div className={styles.field}>
              <p className={styles.title}>
                <LocalText id="rpTitle1" />
              </p>
              <Copier
                text={this.props.account.address}
                copyRef={this.copyRef}
                textStyle={''}
              />
            </div>

            <div className={styles.field}>
              <p className={styles.title}>
                <LocalText id="rpTitle2" />
              </p>
              <img className={styles.qrcode} src={this.state.imgSrc} alt="" />
            </div>
          </div>
        </div>
      )
    }
  }
)
