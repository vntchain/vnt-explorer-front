import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { replace } from 'react-router-redux'

import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import Home from 'containers/Home'

import PageProvider from 'containers/PageProvider'
import BlockList from 'containers/blocks/BlockList'
import TxList from 'containers/txs/TxList'
import AccountList from 'containers/accounts/AccountList'
import ContractList from 'containers/contracts/ContractList'
import TokenList from 'containers/tokens/TokenList'

import BlockDetail from 'containers/blocks/BlockDetail'
import TxDetail from 'containers/txs/TxDetail'
import AccountDetail from 'containers/accounts/AccountDetail'
import ContractDetail from 'containers/contracts/ContractDetail'
import TokenDetail from 'containers/tokens/TokenDetail'
import NodeList from 'containers/NodeList'
import DevGuides from 'containers/DevGuides'
import Faucet from 'containers/Faucet'

import requireAuth from 'containers/requireAuth'
import CreateWallet from 'containers/CreateWallet'
import OpenWallet from 'containers/OpenWallet'
import Receive from 'containers/Receive'
import Send from 'containers/Send'
import Wallet from 'containers/Wallet'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProviderNew'
import apis from 'utils/apis'
import r from 'constants/routes'
import { pageSize } from 'constants/config'

import styles from 'containers/App.scss'

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

    const { index: currentIndex, filterParam } = (() => {
      const a = location.pathname.split('/').filter(item => item)
      let index = isNaN(parseInt(a[a.length - 1], 10))
        ? 1
        : parseInt(a[a.length - 1], 10)

      let filterParam = ''
      if (
        (a.length === 2 && isNaN(parseInt(a[a.length - 1], 10))) ||
        a.length === 3
      ) {
        filterParam = `&${a[1]}`
      }
      if(index < 1){
        a.pop()
        props.dispatch(replace(`/${a.join('/')}/1`))
        index = 1
      }
      return { index, filterParam }
    })()
    // 刷新时的 url 参数
    const baseParams = `offset=${(currentIndex - 1) *
      pageSize}&limit=${pageSize}`
    // 返回除 offset 以为的请求 path
    const getBasePath = type => `${type}?limit=${pageSize}`

    return (
      <div className={styles.app}>
        <div className={styles.margin}>
          <Header />
        </div>

        {/* 开发者指南页的标题 */}
        {location.pathname.startsWith(r.devGuides) && (
          <div className={styles.strTitle}>
            <h2>
              <LocalText id="dgTitle" />
            </h2>
          </div>
        )}

        <div className={styles.margin}>
          <div
            style={{
              minHeight: location.pathname.startsWith(r.devGuides)
                ? 'calc(100vh - 6rem)'
                : 'calc(100vh - 5.18rem)'
            }}
          >
            <Route exact path={r.home} component={Home} />

            <Route
              path={r.blockList}
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.blocks}?${baseParams}`,
                    ns: 'blocks',
                    field: 'blocks'
                  }}
                  render={data => (
                    <PageProvider
                      comp={BlockList}
                      options={{
                        basePath: `${getBasePath(apis.blocks)}`,
                        ns: 'blocks',
                        field: 'blocks'
                      }}
                      refreshProof={true}
                      redirectBase={r.blockList}
                      context={data}
                      currentIndex={currentIndex}
                    />
                  )}
                />
              )}
            />
            <Route path={`${r.blockDetail}/:block`} component={BlockDetail} />

            <Route
              path={r.txList}
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.txs}?${baseParams}${filterParam || ''}`,
                    ns: 'transactions',
                    field: 'txs'
                  }}
                  render={data => (
                    <PageProvider
                      comp={TxList}
                      options={{
                        basePath: `${getBasePath(apis.txs)}${filterParam ||
                          ''}`,
                        ns: 'transactions',
                        field: 'txs'
                      }}
                      refreshProof={true}
                      redirectBase={r.txList}
                      context={data}
                      currentIndex={currentIndex}
                      filterParam={filterParam}
                    />
                  )}
                />
              )}
            />

            <Route path={`${r.txDetail}/:tx`} component={TxDetail} />

            <Route
              path={r.accountList}
              render={() => (
                <DataProvider
                  options={{
                    path: `${apis.accounts}?${baseParams}&isContract=0`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <PageProvider
                      comp={AccountList}
                      options={{
                        basePath: `${getBasePath(apis.accounts)}&isContract=0`,
                        ns: 'accounts',
                        field: 'accounts'
                      }}
                      refreshProof={true}
                      redirectBase={r.accountList}
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
                    path: `${apis.accounts}?${baseParams}&isContract=1`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <PageProvider
                      comp={ContractList}
                      options={{
                        basePath: `${getBasePath(apis.accounts)}&isContract=1`,
                        ns: 'accounts',
                        field: 'accounts'
                      }}
                      refreshProof={true}
                      redirectBase={r.contractList}
                      context={data}
                      currentIndex={currentIndex}
                      typeParam=""
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
                    path: `${apis.accounts}?${baseParams}&isToken=1`,
                    ns: 'accounts',
                    field: 'accounts'
                  }}
                  render={data => (
                    <PageProvider
                      comp={TokenList}
                      options={{
                        basePath: `${getBasePath(apis.accounts)}&isToken=1`,
                        ns: 'accounts',
                        field: 'accounts'
                      }}
                      refreshProof={true}
                      redirectBase={r.tokenList}
                      context={data}
                      currentIndex={currentIndex}
                      typeParam=""
                    />
                  )}
                />
              )}
            />
            <Route path={`${r.tokenDetail}/:toke`} component={TokenDetail} />

            <Route path={r.nodeList} component={NodeList} />
            <Route path={r.devGuides} component={DevGuides} />
            <Route path={r.faucet} component={Faucet} />

            <Route exact path={r['open-wallet']} component={OpenWallet} />
            <Route exact path={r['create-wallet']} component={CreateWallet} />
            <Route exact path={r.receive} component={requireAuth(Receive)} />
            <Route exact path={r.send} component={requireAuth(Send)} />
            <Route exact path={r.wallet} component={requireAuth(Wallet)} />
          </div>
        </div>

        <div className={styles.margin}>
          <Footer />
        </div>
      </div>
    )
  })
)
