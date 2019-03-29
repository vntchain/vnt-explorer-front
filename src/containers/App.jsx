import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Header from 'components/header/Header'
import Home from './Home'

import BlockListNew from 'containers/blocks/ListNew'
import BlockDetail from 'containers/blocks/Detail'
import TxListNew from 'containers/txs/ListNew'
import TxDetail from 'containers/txs/Detail'
import AccountListNew from 'containers/accounts/ListNew'
import AccountDetail from 'containers/accounts/Detail'
import ContractListNew from 'containers/contracts/ListNew'
import ContractDetail from 'containers/contracts/Detail'
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
import r from 'constants/routes'
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

        {location.pathname.startsWith(r.devGuides) && (
          <div className={styles.strTitle}>
            <h2>
              <LocalText id="dgTitle" />
            </h2>
          </div>
        )}

        <div className={styles.margin}>
          <div>
            <Route exact path={r.home} component={Home} />
            <Route
              path={r.blockList}
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
            <Route path={r.blockDetail} component={BlockDetail} />
            <Route
              path={r.txList}
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
            <Route path={r.txDetail} component={TxDetail} />
            <Route
              path={r.accountList}
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.accounts}?offset=${(currentIndex - 1) *
                      pageSize}&limit=${pageSize}&isContract=0`,
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
            <Route
              path={`${r.accountDetail}/:acct`}
              component={AccountDetail}
            />
            <Route
              path={r.contractList}
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

            <Route
              path={`${r.contractDetail}/:cont`}
              component={ContractDetail}
            />

            <Route
              path={r.tokenList}
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
            <Route path={`${r.tokenDetail}/:toke`} component={TokenDetail} />
            <Route path={r.nodeList} component={NodeList} />
            <Route path={r.devGuides} component={DevGuides} />
            <Route path={r.faucet} component={Faucet} />

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
