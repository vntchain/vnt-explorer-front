import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import { pageSize } from 'constants/config'

import styles from 'components/BaseTable.scss'

function BaseTable(props) {
  const { tableType, columns, data, currentIndex, flipPage } = props
  let tableClass = ''
  switch (tableType) {
    case 'list':
      tableClass = styles.table
      break
    case 'tabList':
      tableClass = styles.tabTable
      break
    case '2colDetail':
      tableClass = styles.revTable
      break
    case '4colDetail':
      tableClass = styles.revTable4C
      break
  }
  return (
    <Table
      style={data.length === 0 ? { paddingTop: '0.6rem' } : {}}
      className={tableClass}
      columns={columns}
      dataSource={data}
      pagination={
        props.pagination === false
          ? false
          : {
              position: 'both',
              pageSize: pageSize,
              total: props.data.length === 0 ? 0 : props.count,
              showQuickJumper: true,
              onChange: p => flipPage(p),
              current: currentIndex
            }
      }
    />
  )
}

BaseTable.propTypes = {
  tableType: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  flipPage: PropTypes.func,
  currentIndex: PropTypes.number,
  count: PropTypes.number,
  pagination: PropTypes.oneOf([false])
}

export default BaseTable
