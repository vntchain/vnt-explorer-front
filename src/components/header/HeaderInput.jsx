import React from 'react'
import { Input } from 'antd'

import styles from './Header.scss'

export default function HeaderInput({ lang }) {
  const handleSearch = v => {
    /* eslint-disable */
    console.log('%c%s\n%csearch content: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', )
    console.log(v)
    /* eslint-enable */
  }
  return (
    <div className={styles.input}>
      <Input.Search
        placeholder={
          lang === 'cn'
            ? '搜索地址，区块，交易'
            : 'Search address, block, transaction'
        }
        enterButton
        allowClear
        onSearch={handleSearch}
      />
    </div>
  )
}
