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
      key: 'from',
      dataIndex: 'from',
      // eslint-disable-next-line react/display-name
      render: from => (
        <Link to={`/account/${from}`}>{from.slice(0, 12) + '...'}</Link>
      )
    },
    {
      title: <LocalText id="tlpColumn5" />,
      key: 'to',
      dataIndex: 'to',
      // eslint-disable-next-line react/display-name
      render: ({ isToken, name, value }) => {
        var isContractCreation = false
        if (isToken && !value) {
            isContractCreation = true
        }

            console.log("##### TXlist: ", isContractCreation, isToken, name, value)
        if (isContractCreation) {
            return ""
        }

        if (isToken) {
            if (value) {
                return (
                  <Link to={`/contract/${value}`}>
                    <Icon type="project" />
                    {name || ' ' + value.slice(0, 12) + '...'}
                  </Link>
                )
            } else {
                return ""
            }
        }

        return (
          <Link to={`/account/${value}`}>{value.slice(0, 12) + '...'}</Link>
        )
      }
    },
    {
      title: <LocalText id="tlpColumn6" />,
      dataIndex: 'value',
      key: 'value'
    }
  ]

  const data = []
  if (
    props.context &&
    props.context.data &&
    Array.isArray(props.context.data)
  ) {
    props.context.data.forEach((item, i) => {

      console.log("#### tx to: ", item.To)
      var d = {
        key: item.Hash + i,
        tx: item.Hash,
        height: item.BlockNumber,
        age: item.TimeStamp,
        from: item.From,
        to: {
          isToken: item.IsToken,
          name: item.To?item.To.ContractName:"",
          value: item.To ? item.To.Address:""
        },
        value: item.Value
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
