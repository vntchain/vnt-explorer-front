import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'
import { connect } from 'react-redux'

import LocalText from 'i18n/LocalText'

import { pageSize } from 'constants/config'
import apis from 'utils/apis'

const mapStateToProps = ({ transactions: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function PagedTable(props) {
  const handlePageChange = e => {
    setCurrent(e)
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: props.basePath + `&offset=${(parseInt(e, 10) - 1) * pageSize}`,
        ns: 'transactions',
        field: 'filteredTxs'
      }
    })
  }

  const [current, setCurrent] = useState(props.currentIndex)

  const columns = [
    {
      title: <LocalText id="tlpColumn1" />,
      dataIndex: 'tx',
      key: 'tx',
      // eslint-disable-next-line react/display-name
      render: tx => (
        <Link to={`/transaction/${tx}`}>{tx.slice(0, 12) + '...'}</Link>
      )
    },
    {
      title: <LocalText id="tlpColumn2" />,
      dataIndex: 'height',
      key: 'height',
      // eslint-disable-next-line react/display-name
      render: height => <Link to={`${apis.block}/${height}`}>{height}</Link>
    },
    {
      title: <LocalText id="tlpColumn3" />,
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: <LocalText id="tlpColumn4" />,
      key: 'tokenFrom',
      dataIndex: 'tokenFrom',
      // eslint-disable-next-line react/display-name
      render: from => {
        if (from){
          return (
            <Link to={`/account/${from}`}>{from.slice(0, 12) + '...'}</Link>
          )
        } else {
          return ""
        }
      }
    },
    {
      title: <LocalText id="blank" />,
      key: 'direction',
      dataIndex: 'direction'
    },
    {
      title: <LocalText id="tlpColumn5" />,
      key: 'tokenTo',
      dataIndex: 'tokenTo',
      // eslint-disable-next-line react/display-name
      render: tokenTo => {
        if(tokenTo) {
          return (
            <Link to={`/account/${tokenTo}`}>{tokenTo.slice(0, 12) + '...'}</Link>
          )
        } else {
          return ""
        }
      }
    },
    {
      title: <LocalText id="tlpColumn6" />,
      dataIndex: 'tokenAmount',
      key: 'tokenAmount'
    },
    {
      title: <LocalText id="tklpTitle" />,
      key: 'to',
      dataIndex: 'to',
      // eslint-disable-next-line react/display-name
      render: to => (
        <Link to={`/token/${to.address}`}>{to.contractName}</Link>
      )
    },
  ]

  const data = []
  if (
    props.context &&
    props.context.data &&
    Array.isArray(props.context.data)
  ) {
    props.context.data.forEach((item, i) => {
      var d = {
        key: item.Hash + i,
        tx: item.Hash,
        height: item.BlockNumber,
        age: item.TimeStamp,
        tokenFrom: item.TokenFrom,
        tokenTo: item.TokenTo,
        tokenAmount: item.TokenAmount,
      }

      if(item.To) {
          d.to = {
              address: item.To.Address,
              contractName: item.To.ContractName
          }
      } else {
          d.to = {
              address: null,
              contractName: null
          }
      }

      if (props.address == d.from) {
        d.direction = "OUT"
      } else if(props.address == d.tokenTo) {
        d.direction = "TO"
      } else {
        d.direction = ""
      }

      console.log("##### tx data: ", d)
      data.push(d)
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
