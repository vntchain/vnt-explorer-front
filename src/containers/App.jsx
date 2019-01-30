import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import NewWallet from './NewWallet'
import OpenWallet from './OpenWallet'
import Account from './Account'
import Receive from './Receive'
import Send from './Send'
import Header from 'components/header/Header'

import styles from './App.scss'

export default function App() {
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
      </div>
    </div>
  )
}
