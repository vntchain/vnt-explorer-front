import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import NewWallet from './NewWallet'
import OpenWallet from './OpenWallet'
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
      </div>
    </div>
  )
}
