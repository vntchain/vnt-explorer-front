import React from 'react'
import { Table } from 'antd'

import { pageSize } from 'constants/config'

import styles from 'containers/Common.scss'

export default function BaseTable(props) {
  return (
    <Table
      style={props.data.length === 0 ? { paddingTop: '0.6rem' } : {}}
      className={styles.table}
      columns={props.columns}
      dataSource={props.data}
      pagination={{
        position: 'both',
        pageSize: pageSize,
        total: props.data.length === 0 ? 0 : props.count,
        showQuickJumper: true,
        onChange: p => props.flipPage(p),
        current: props.currentIndex
      }}
    />
  )
}
