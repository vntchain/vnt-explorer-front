import React from 'react'

import Banner from '../components/Banner'

import styles from './NewWallet.scss'

export default function NewWallet() {
  return (
    <div className={styles.newWallet}>
      <Banner title="创建新的钱包" />
    </div>
  )
}
