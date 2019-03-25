import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import queryString from 'query-string'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'

import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'

import styles from 'containers/Common.scss'

const mapStateToProps = ({ transactions: { count, filteredTxs } }) => {
  return {
    count,
    filteredTxs
  }
}

const pageSize = 20

const txFilter = location => {
  let currentIndex = 1
  let apiParam = ``
  let filter, filterValue, fieldID
  const filterType = ['block', 'account']

  if (location.search) {
    const paramArr = queryString.parse(location.search)

    currentIndex = 'p' in paramArr ? paramArr.p : currentIndex

    for (const ft of filterType) {
      if (ft in paramArr) {
        filter = ft
        filterValue = paramArr[ft]
        apiParam += `${ft}=${paramArr[ft]}`
        break
      }
    }
  }

  switch (filter) {
    case 'block':
      fieldID = 'txFilterByBlock'
      break
    case 'account':
      fieldID = 'txFilterByAccount'
      break
    default:
      break
  }

  return {
    currentIndex: !isNaN(parseInt(currentIndex, 10))
      ? parseInt(currentIndex, 10)
      : 1,
    apiParam, // e.g., block = 1
    filter,
    filterValue,
    fieldID
  }
}

export default withLang(
  connect(mapStateToProps)(function TxList(props) {
    const { currentIndex, apiParam, filter, filterValue, fieldID } = txFilter(
      location
    )

    useEffect(
      () => {
        props.dispatch({
          type: 'dataRelay/fetchData',
          payload: {
            path: `${apis.txs}?${apiParam}`,
            ns: 'transactions',
            field: 'filteredTxs'
          }
        })
      },
      [location.href]
    )

    return (
      <div>
        {!filter ? (
          <DataProvider
            options={{
              path: apis.txCount,
              ns: 'transactions',
              field: 'count'
            }}
            render={data => (
              <Title
                titleID="tlpTitle"
                subTitleID="tlpSubTitle"
                context={data}
              />
            )}
          />
        ) : (
          <DataProvider
            options={{
              path: `${apis.txs}?${apiParam}`,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <Title
                titleID={fieldID}
                subTitleID={`${fieldID}Sub`}
                suffix={' ' + filterValue}
                context={{ data: data && data.data ? data.data.length : 0 }}
              />
            )}
          />
        )}

        {(filter ||
          (props.count && props.count.data && props.count.data > 0)) && (
          <DataProvider
            options={{
              path: `${apis.txs}?${apiParam}&offset=${(currentIndex - 1) *
                pageSize}&limit=${pageSize}`, // api params with paging
              ns: 'transactions',
              field: 'txs'
            }}
            key={location.href}
            render={data => (
              <PagedTable
                size={
                  !filter
                    ? props.count.data
                    : props.filteredTxs && props.filteredTxs.data
                      ? props.filteredTxs.data.length
                      : 0
                } // can change size to simulate page action
                context={data}
                apiParam={apiParam}
                dispatch={props.dispatch}
                currentIndex={currentIndex}
                changePath={path => props.dispatch(push(path))}
                key={location.href}
                filtered={filter}
                lang={props.language}
              />
            )}
          />
        )}
      </div>
    )
  })
)

function PagedTable(props) {
  const handlePageChange = e => {
    if (e !== props.currentIndex) {
      props.changePath(
        `${location.pathname.split('?')[0]}?${props.apiParam}&p=${e}`
      )
      setCurrent(e)
    }
  }

  const [current, setCurrent] = useState(props.currentIndex)
  useEffect(
    () => {
      props.dispatch({
        type: 'dataRelay/fetchData',
        payload: {
          path: `${apis.txs}?${props.apiParam}&offset=${(current - 1) *
            pageSize}&limit=${pageSize}`, // api params with paging
          ns: 'transactions',
          field: 'txs'
        }
      })
    },
    [location.href]
  )

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
      render: height =>
        props.filtered ? (
          height
        ) : (
          <Link to={`${apis.txs}?block=${height}`}>{height}</Link>
        )
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

        if (isContractCreation) {
          return ''
        }

        if (isToken) {
          return (
            <Link to={`/contract/${value}`}>
              <Icon type="project" />
              {name || ' ' + value.slice(0, 12) + '...'}
            </Link>
          )
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
      data.push({
        key: item.Hash + i,
        tx: item.Hash,
        height: item.BlockNumber,
        age: calcAge(item.TimeStamp, props.lang),
        from: item.From,
        to: {
          isToken: item.To ? item.To.IsToken : false,
          name: item.To ? item.To.ContractName : '',
          value: item.To ? item.To.Address : ''
        },
        value: item.Value
      })
    })
  }

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={data}
      pagination={{
        position: 'both',
        pageSize: pageSize,
        total: props.size,
        showQuickJumper: true,
        onChange: handlePageChange,
        current: props.currentIndex
      }}
    />
  )
}
