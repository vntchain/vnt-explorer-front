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
      render: ({ isContract, isToken, address, contractName }) => {
        var isContractCreation = false
        if (!address) {
            isContractCreation = true
        }

        console.log("##### TXlist: ", isContractCreation, isToken, contractName, address)
        if (isContractCreation) {
          return ''
        }

        if (isToken) {
            return (
              <Link to={`/contract/${address}`}>
                <Icon type="project" />
                {contractName || ' ' + address.slice(0, 12) + '...'}
              </Link>
            )
        }

        if (isContract) {
            return (
              <Link to={`/contract/${address}`}>
                <Icon type="project" />
                {contractName || ' ' + address.slice(0, 12) + '...'}
              </Link>
            )
        }

        return (
          <Link to={`/account/${address}`}>{address.slice(0, 12) + '...'}</Link>
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
      var d = {
        key: item.Hash + i,
        tx: item.Hash,
        height: item.BlockNumber,
        age: item.TimeStamp,
        from: item.From,
        value: item.Value
      }

      if(item.To) {
          d.to = {
              isContract: item.To.IsContract,
              isToken: item.To.IsToken,
              address: item.To.Address,
              contractName: item.To.ContractName
          }
      } else {
          d.to = {
              isContract: null,
              isToken: null,
              address: null,
              contractName: null
          }
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
