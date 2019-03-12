import React from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'

const mapStateToProps = ({ transactions: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function Txs(props) {
  const urlPath = location.pathname.split('/').filter(item => item)
  let currentIndex = 1
  if (urlPath.length > 0 && !isNaN(parseInt(urlPath[urlPath.length - 1], 10))) {
    currentIndex = parseInt(urlPath[urlPath.length - 1], 10)
  }

  return (
    <div>
      <DataProvider
        options={{
          path: apis.txCount,
          ns: 'transactions',
          field: 'count'
        }}
        render={data => (
          <Title titleID="tlpTitle" subTitleID="tlpSubTitle" context={data} />
        )}
      />
      {props.count &&
        props.count.data &&
        props.count.data > 0 && (
          <DataProvider
            options={{
              path: `${apis.txs}?offset=${(currentIndex - 1) * 20}&limit=20`,
              ns: 'transactions',
              field: 'txs'
            }}
            render={data => (
              <PagedTable
                size={props.count.data}
                context={data}
                dispatch={props.dispatch}
                currentIndex={currentIndex}
                changePath={path => props.dispatch(push(path))}
              />
            )}
          />
        )}
    </div>
  )
})

function PagedTable(props) {
  const handlePageChange = e => {
    if (e !== props.currentIndex) {
      props.changePath(`/transactions/${e}`)
    }
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: `${apis.txs}?offset=${(e - 1) * 20}&limit=20`,
        ns: 'transactions',
        field: 'txs'
      }
    })
  }

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
      key: 'height'
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
      render: from => <Link to="/todo">{from.slice(0, 12) + '...'}</Link>
    },
    {
      title: <LocalText id="tlpColumn5" />,
      key: 'to',
      dataIndex: 'to',
      // eslint-disable-next-line react/display-name
      render: ({ isContract, value }) => {
        return (
          <Link to="/todo">
            {isContract && <Icon type="project" />}
            {' ' + value.slice(0, 12) + '...'}
          </Link>
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
      data.push({
        key: item.Hash + i,
        tx: item.Hash,
        height: item.BlockNumber,
        age: item.TimeStamp,
        from: item.From,
        to: {
          isContract: item.ContractAddr ? true : false,
          value: item.ContractAddr ? item.ContractAddr : item.To
        },
        value: item.Value
      })
    })
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        position: 'both',
        pageSize: 20,
        total: props.size,
        showQuickJumper: true,
        onChange: handlePageChange,
        current: props.currentIndex
      }}
    />
  )
}
