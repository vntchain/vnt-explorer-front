import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Route } from 'react-router-dom'

import MarkdownConverter from './devGuides/MdConverter'

import { menuItemFactory } from 'components/header/HeaderMenu'
import { devGuideMenu } from 'utils/menu.js'

import styles from './DevGuides.scss'

export default function DevGuideIndex() {
  const [activeNav, setActiveNav] = useState(
    sessionStorage.activeNav || 'developer'
  )
  useEffect(
    () => {
      // extract the last part of pathname
      const pathArr = location.pathname.split('/')
      setActiveNav(pathArr[pathArr.length - 1])
    },
    [location.pathname]
  )
  return (
    <div className={styles.devGuides}>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <Menu selectedKeys={[activeNav]} mode="inline" openKeys={["extension"]}>
            {menuItemFactory(devGuideMenu, false, true, () => {})}
          </Menu>
        </nav>

        <main className={styles.content}>
          {/* <Route exact path="/developer" component={Introduction} /> */}
          <Route
            exact
            path="/developer"
            render={() => <MarkdownConverter filePath="developer-guide/01-introduction/hubble.md" />}
          />
          <Route
            exact
            path="/developer/network"
            render={() => (
              <MarkdownConverter filePath="introduction/set-up-vnt-network/set-up-4-node-vnt-network.md" />
            )}
          />
          <Route
            exact
            path="/developer/consensus"
            render={() => (
              <MarkdownConverter filePath="introduction/take-part-in-witness-election/take-part-in-witness-election.md" />
            )}
          />
          <Route
            exact
            path="/developer/test"
            render={() => (
              <MarkdownConverter filePath="developer-guide/05-network/connect-to-hubble-testnet.md" />
            )}
          />
          <Route
            exact
            path="/developer/join"
            render={() => (
              <MarkdownConverter filePath="developer-guide/05-network/connect-to-hubble-network.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp"
            render={() => <MarkdownConverter filePath="dapp/guide.md" />}
          />
          <Route
            exact
            path="/developer/dapp/develop"
            render={() => (
              <MarkdownConverter filePath="smart-contract/write-contract.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp/compile"
            render={() => (
              <MarkdownConverter filePath="smart-contract/compile-contract.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp/invoke"
            render={() => (
              <MarkdownConverter filePath="smart-contract/deploy-contract-tutorial.md" />
            )}
          />
          <Route
            exact
            path="/developer/wallet/install"
            render={() => (
              <MarkdownConverter filePath="wallet/load-chrome-extension.md" />
            )}
          />
          <Route
            exact
            path="/developer/wallet/use"
            render={() => (
              <MarkdownConverter filePath="wallet/dapp-deploy-wallet.md" />
            )}
          />
        </main>
      </div>
    </div>
  )
}
