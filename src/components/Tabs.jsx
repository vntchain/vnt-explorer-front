import React, { useState } from 'react'
import { Radio } from 'antd'

import index from 'utils/locale'

import styles from './Tabs.scss'

export default function Tabs(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleSelect = e => setActiveTabIndex(e.target.value)

  return (
    <div className={styles.tabs}>
      <Radio.Group
        defaultValue={activeTabIndex}
        buttonStyle="solid"
        onChange={handleSelect}
      >
        {props.tabs.map((item, i) => (
          <Radio.Button key={item[index(props.language)]} value={i}>
            {item[index(props.language)]}
          </Radio.Button>
        ))}
      </Radio.Group>

      <div className={styles.content}>{props.tabs[activeTabIndex][2]}</div>
    </div>
  )
}
