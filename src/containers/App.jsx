import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Header from 'components/header/Header'
import Home from './Home'

import BlockList from 'containers/blocks/List'
import BlockListNew from 'containers/blocks/ListNew'
import BlockDetail from 'containers/blocks/Detail'
import TxList from 'containers/txs/List'
import TxListNew from 'containers/txs/ListNew'
import TxDetail from 'containers/txs/Detail'
import AccountList from 'containers/accounts/List'
import AccountListNew from 'containers/accounts/ListNew'
import AccountDetail from 'containers/accounts/Detail'
import ContractList from 'containers/contracts/List'
import ContractListNew from 'containers/contracts/ListNew'
import ContractDetail from 'containers/contracts/Detail'
import TokenList from 'containers/tokens/List'
import TokenListNew from 'containers/tokens/ListNew'
import TokenDetail from 'containers/tokens/Detail'
import NodeList from 'containers/NodeList'
import DevGuides from 'containers/DevGuides'
import Faucet from 'containers/Faucet'

/* import NewWallet from './NewWallet'
import OpenWallet from './OpenWallet'
import Receive from './Receive'
import Send from './Send' */

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProviderNew'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'

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

    const currentIndex = (() => {
      const a = location.pathname.split('/')
      const index = isNaN(parseInt(a[a.length - 1], 10))
        ? 1
        : parseInt(a[a.length - 1], 10)
      return index
    })()

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
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/blocks" component={BlockList} />
            <Route
              path="/blocks-new"
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.blocks}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}`,
                    ns: 'blocks',
                    field: 'blocks'
                  }}
                  render={data => (
                    <BlockListNew context={data} currentIndex={currentIndex} />
                  )}
                />
              )}
            />
            <Route path="/block" component={BlockDetail} />
            <Route exact path="/txs" component={TxList} />
            <Route
              path="/txs-new"
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.txs}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}`,
                    ns: 'transactions',
                    field: 'txs'
                  }}
                  render={data => (
                    <TxListNew context={data} currentIndex={currentIndex} />
                  )}
                />
              )}
            />
            <Route path="/transaction" component={TxDetail} />
            <Route path="/accounts" component={AccountList} />
            <Route
              path="/accounts-new"
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.accounts}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <AccountListNew
                      context={data}
                      currentIndex={currentIndex}
                      typeParam=""
                    />
                  )}
                />
              )}
            />
            <Route path="/account/:acct" component={AccountDetail} />
            <Route path="/contracts" component={ContractList} />
            <Route
              path="/contracts-new"
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.accounts}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}&isContract=1`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <ContractListNew
                      context={data}
                      currentIndex={currentIndex}
                      typeParam="&isContract=1"
                    />
                  )}
                />
              )}
            />
            <Route path="/contract" component={ContractDetail} />
            <Route path="/tokens" component={TokenList} />
            <Route
              path="/tokens-new"
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.accounts}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}&isToken=1`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <TokenListNew
                      context={data}
                      currentIndex={currentIndex}
                      typeParam="&isToken=1"
                    />
                  )}
                />
              )}
            />
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
      </div>
    )
  })
)
