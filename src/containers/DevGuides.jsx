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
          <Menu selectedKeys={[activeNav]} mode="inline">
            {menuItemFactory(devGuideMenu, false, true, () => {})}
          </Menu>
        </nav>

        <main className={styles.content}>
          {/* <Route exact path="/developer" component={Introduction} /> */}
          <Route
            exact
            path="/developer"
            render={() => <MarkdownConverter filePath="index.md" />}
          />
          <Route
            exact
            path="/developer/network"
            render={() => (
              <MarkdownConverter filePath="set-up-vnt-network/set-up-4-node-vnt-network.md" />
            )}
          />
          <Route
            exact
            path="/developer/consensus"
            render={() => (
              <MarkdownConverter filePath="take-part-in-witness-election/take-part-in-witness-election.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp"
            render={() => <MarkdownConverter filePath="dapp/index.md" />}
          />
          <Route
            exact
            path="/developer/dapp/develop"
            render={() => (
              <MarkdownConverter filePath="dapp/howto-write-contract.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp/compile"
            render={() => (
              <MarkdownConverter filePath="dapp/compile-contract.md" />
            )}
          />
          <Route
            exact
            path="/developer/dapp/invoke"
            render={() => (
              <MarkdownConverter filePath="dapp/deploy-contract-tutorial.md" />
            )}
          />
        </main>
      </div>
    </div>
  )
}
