import React from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'

import { pageSize } from 'constants/config'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function Accounts(props) {
  const urlPath = location.pathname.split('/').filter(item => item)
  let currentIndex = 1
  if (urlPath.length > 0 && !isNaN(parseInt(urlPath[urlPath.length - 1], 10))) {
    currentIndex = parseInt(urlPath[urlPath.length - 1], 10)
  }

  return (
    <div>
      <DataProvider
        options={{
          path: apis.accountCount,
          ns: 'accounts',
          field: 'count'
        }}
        render={data => (
          <Title titleID="alpTitle" subTitleID="alpSubTitle" context={data} />
        )}
      />
      {props.count &&
        props.count.data &&
        props.count.data > 0 && (
          <DataProvider
            options={{
              path: `${apis.accounts}?offset=${(currentIndex - 1) *
                20}&limit=20`,
              ns: 'accounts',
              field: 'accounts'
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
  var currPage = 1
  const handlePageChange = e => {
    currPage = e
    if (e !== props.currentIndex) {
      props.changePath(`${apis.accounts}/${e}`)
    }
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: `${apis.accounts}?offset=${(e - 1) * 20}&limit=${pageSize}`,
        ns: 'accounts',
        field: 'accounts'
      }
    })
  }

  const columns = [
    {
      title: <LocalText id="alpColumn1" />,
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: <LocalText id="alpColumn2" />,
      dataIndex: 'address',
      key: 'address',
      // eslint-disable-next-line react/display-name
      render: ({ isContract, value }) => {
        return (
          <Link to={`/account/${value}`}>
            {isContract && <Icon type="project" />}
            {' ' + value + '...'}
          </Link>
        )
      }
    },
    {
      title: <LocalText id="alpColumn3" />,
      dataIndex: 'balance',
      key: 'balance'
    },
    {
      title: <LocalText id="alpColumn4" />,
      key: 'percentage',
      dataIndex: 'percentage'
    },
    {
      title: <LocalText id="alpColumn5" />,
      key: 'txCount',
      dataIndex: 'txCount'
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
        index: index,
        key: item.Address + i,
        address: { value: item.Address, isContract: item.IsContract },
        balance: item.Balance,
        percentage: 'missing',
        txCount: item.TxCount
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
