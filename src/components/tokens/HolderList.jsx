import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { connect } from 'react-redux'

import LocalText from 'i18n/LocalText'

import { pageSize } from 'constants/config'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function PagedTable(props) {
  var currPage = 1
  const handlePageChange = e => {
    setCurrent(e)
    currPage = e
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: props.basePath + `&offset=${(parseInt(e, 10) - 1) * pageSize}`,
        ns: 'accounts',
        field: 'tokens'
      }
    })
  }

  const [current, setCurrent] = useState(props.currentIndex)

  const columns = [
    {
      title: <LocalText id="rank" />,
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: <LocalText id="adpField2" />,
      dataIndex: 'address',
      key: 'address',
      // eslint-disable-next-line react/display-name
      render: address => (
        <Link to={`/account/${address}`}>
          {address}
        </Link>
      )
    },
    {
      title: <LocalText id="tkdpField3" />,
      dataIndex: 'balance',
      key: 'balance'
    },
    {
      title: <LocalText id="tkdpField4" />,
      key: 'percent',
      dataIndex: 'percent'
    }
  ]

  const data = []
  if (
    props.context &&
    props.context.data &&
    Array.isArray(props.context.data)
  ) {
    var index = (currPage - 1) * pageSize
    props.context.data.forEach((item, i) => {
      index ++
      data.push({
        key: i,
        index: index,
        address: item.Account.Address,
        balance: item.Balance,
        percent: (parseFloat(item.Balance) / parseFloat(item.Token.TokenAmount) * 100).toFixed(2)
      })
    })
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        position: 'both',
        pageSize: pageSize,
        total: props.count && props.count.data ? props.count.data : 0,
        showQuickJumper: true,
        onChange: handlePageChange,
        current
      }}
    />
  )
})
