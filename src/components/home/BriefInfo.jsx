import React from 'react'

import index from 'utils/locale'

import styles from './BriefInfo.scss'

const fields = [
  ['区块高度', 'Block Height'],
  ['交易数', 'Transactions'],
  ['当前/峰值 TPS', 'Current/Max TPS'],
  ['总账户数', 'Total Accounts'],
  ['超级节点/候选节点', 'Super/Candidate Nodes']
]

export default function BriefInfo(props) {
  return (
    <div className={styles.brief}>
      {fields.map((item, i) => (
        <div key={item[0]} className={styles['brief-item']}>
          <p className={styles['brief-item__title']}>
            {item[index(props.lang)]}
          </p>
          <p className={styles['brief-item__number']}>{props.data[i]}</p>
        </div>
      ))}
    </div>
  )
}
