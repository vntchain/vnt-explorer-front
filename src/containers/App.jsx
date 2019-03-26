import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Header from 'components/header/Header'
import Home from './Home'
import BlockList from 'containers/blocks/List'
import BlockDetail from 'containers/blocks/Detail'
import TxList from 'containers/txs/List'
import TxDetail from 'containers/txs/Detail'
import AccountList from 'containers/accounts/List'
import AccountDetail from 'containers/accounts/Detail'
import ContractList from 'containers/contracts/List'
import ContractDetail from 'containers/contracts/Detail'
import TokenList from 'containers/tokens/List'
import TokenDetail from 'containers/tokens/Detail'
import NodeList from 'containers/NodeList'
import DevGuides from 'containers/DevGuides'
import Faucet from 'containers/Faucet'

/* import NewWallet from './NewWallet'
import OpenWallet from './OpenWallet'
import Receive from './Receive'
import Send from './Send' */

import LocalText from 'i18n/LocalText'

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

        {location.pathname.startsWith('/developer') && (
          <div className={styles.strTitle}>
            <h2>
              <LocalText id="dgTitle" />
            </h2>
          </div>
        )}

        <div className={styles.margin}>
          <Route exact path="/" component={Home} />

          <Route path="/blocks" component={BlockList} />
          <Route path="/block" component={BlockDetail} />
          <Route exact path="/txs" component={TxList} />
          <Route path="/transaction" component={TxDetail} />
          <Route path="/accounts" component={AccountList} />
          <Route path="/account/:acct" component={AccountDetail} />
          <Route path="/contracts" component={ContractList} />
          <Route path="/contract" component={ContractDetail} />
          <Route path="/tokens" component={TokenList} />
          <Route path="/token" component={TokenDetail} />
          <Route path="/super-node" component={NodeList} />
          <Route path="/developer" component={DevGuides} />
          <Route path="/faucet" component={Faucet} />

          {/* <Route exact path="/view-wallet" component={OpenWallet} />
          <Route exact path="/new-wallet" component={NewWallet} />
          <Route exact path="/receive" component={Receive} />
          <Route exact path="/send" component={Send} /> */}
        </div>
      </div>
    )
  })
)
