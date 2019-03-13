import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Home from './Home'
import NewWallet from './NewWallet'
import OpenWallet from './OpenWallet'
import Account from './Account'
import Receive from './Receive'
import Send from './Send'
import SuperNode from './SuperNode'
import Blocks from './Blocks'
import BlockDetail from './BlockDetail'
import Transactions from './Transactions'
import TxDetail from './TxDetail'
import Header from 'components/header/Header'

import styles from './App.scss'

const mapStateToProps = ({ global: { isMobile } }) => {
  return {
    isMobile
  }
}

export default withRouter(
  connect(mapStateToProps)(function App(props) {
    const handleResize = () => {
      const clientWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
      )
      if (!props.isMobile && clientWidth <= 600) {
        props.dispatch({
          type: 'global/setIsMobile',
          payload: true
        })
      } else if (props.isMobile && clientWidth > 600) {
        props.dispatch({
          type: 'global/setIsMobile',
          payload: false
        })
      }
    }

    useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })

    return (
      <div className={styles.app}>
        <div className={styles.margin}>
          <Header />
        </div>
        <div className={styles.margin}>
          <Route exact path="/" component={Home} />
          <Route exact path="/view-wallet" component={OpenWallet} />
          <Route exact path="/new-wallet" component={NewWallet} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/receive" component={Receive} />
          <Route exact path="/send" component={Send} />
          <Route exact path="/super-node" component={SuperNode} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/block" component={BlockDetail} />
          <Route exact path="/txs" component={Transactions} />
          <Route path="/transaction" component={TxDetail} />
        </div>
      </div>
    )
  })
)
