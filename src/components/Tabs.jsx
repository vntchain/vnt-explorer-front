import React, { useState } from 'react'
import { Radio } from 'antd'

import styles from './Tabs.scss'

export default function Tabs(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleSelect = e => {
    // 重置 `transactions/txs` 字段
    // tab 下的交易数依赖 txs.length，不重置切 tab 会有影响
    props.dispatch({
      type: 'transactions/resetTxData'
    })
    setActiveTabIndex(e.target.value)
  }

  return (
    <div className={styles.tabs}>
      <Radio.Group
        defaultValue={activeTabIndex}
        buttonStyle="solid"
        onChange={handleSelect}
      >
        {props.tabs.map((item, i) => (
          <Radio.Button key={i} value={i}>
            {item.btnName}
          </Radio.Button>
        ))}
      </Radio.Group>

      <div className={styles.content}>{props.tabs[activeTabIndex].comp}</div>
    </div>
  )
}
