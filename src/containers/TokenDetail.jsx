import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'

import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import Tabs from 'components/Tabs'
import TxList from 'components/txs/TxList'
import TokenTxList from 'components/tokens/TokenTxList'
import HolderList from 'components/tokens/HolderList'
import TxCount from 'components/txs/TxCount'
import TokenList from 'components/tokens/TokenList'
import TokenCount from 'components/tokens/TokenCount'

import apis from 'utils/apis'
import { pageSize } from 'constants/config'

const mapStateToProps = ({ accounts: { accountDetail } }) => {
  return {
    accountDetail
  }
}

export default connect(mapStateToProps)(function ContractDetail(props) {
  useEffect(
    () => {
      props.dispatch({
        type: 'dataRelay/fetchData',
        payload: {
          // `path` here not robust
          path: `${apis.accountDetail}/${
            props.location.pathname.split('/').filter(item => item)[1]
          }`,
          ns: 'accounts',
          field: 'accountDetail'
        }
      })
    },
    [location.pathname]
  )

  const columns = [
    {
      title: <LocalText id="tklpColumn4" />,
      dataIndex: 'col1',
      key: 'col1'
    },
    {
      title:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('TokenAmount')
          ? `${props.accountDetail.data.TokenAmount}`
          : '-/-',
      dataIndex: 'col2',
      key: 'col2'
    },
    {
      title: <LocalText id="tklpColumn6" />,
      dataIndex: 'col3',
      key: 'col3'
    },
    {
      title:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('Address')
          ? (
            <Link to={`/contract/${props.accountDetail.data.Address}`}>
              {props.accountDetail.data.Address}
            </Link>
          )
          : '-/-',
      dataIndex: 'col4',
      key: 'col4'
    }
  ]

  const data = [
    {
      key: '1',
      col1: <LocalText id="tklpColumn5" />,
      col2:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('TokenAcctCount')
          ? `${props.accountDetail.data.TokenAcctCount} 地址`
          : '-/-',
      col3: <LocalText id="tklpColumn7" />,
      col4:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.Home
          ? (
            <Link to={`/token/${props.accountDetail.data.Home}`}>
              {props.accountDetail.data.Home}
            </Link>
          )
          : '--'
    }
  ]

  const tabs = [
    {
      btnName: <LocalText id="adpField4" />,
      comp: (
        <Fragment key="1">
          {/* 获取当前账户所有交易，为计算交易数 */}
          <DataProvider
            options={{
              path: `${apis.txCount}?account=` + location.pathname.split('/')[2],
              ns: 'transactions',
              field: 'count'
            }}
            render={data => (
              <TxCount
                id="adpCount1"
                context={data}
                dispatch={props.dispatch}
              />
            )}
          />
          {/* 获取当前账户第一分页的交易 */}
          <DataProvider
            options={{
              path:
                `${apis.txs}?limit=${pageSize}&offset=0&account=` +
                location.pathname.split('/')[2],
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <TokenTxList
                context={data}
                dispatch={props.dispatch}
                basePath={
                  `${apis.txs}?limit=${pageSize}&account=` +
                  location.pathname.split('/')[2]
                }
                address={location.pathname.split('/')[2]}
              />
            )}
          />
        </Fragment>
      )
    },
    {
      btnName: <LocalText id="tkdpField2" />,
      comp: (
        <Fragment key="2">
          {/* 获取当前账户所有代币交易，为计算交易数 */}
          <DataProvider
            options={{
              path:
                `${apis.token}/${location.pathname.split('/')[2]}/holders/count`,
              ns: 'transactions',
              field: 'count'
            }}
            render={data => (
              <TxCount
                id="tkdpSubTitle"
                context={data}
                dispatch={props.dispatch}
              />
            )}
          />
          {/* 获取当前账户第一分页的代币交易 */}
          <DataProvider
            options={{
              path:`${apis.token}/${location.pathname.split('/')[2]}/holders?limit=${pageSize}`,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <HolderList
                context={data}
                dispatch={props.dispatch}
                basePath={
                  `${apis.txs}?limit=${pageSize}&account=` +
                  location.pathname.split('/')[2]
                }
              />
            )}
          />
        </Fragment>
      )
    },
  ]

  return (
    <div>
      <Title
        titleID="tklpTitle"
        suffix={
          props.accountDetail &&
          props.accountDetail.data &&
          props.accountDetail.data.hasOwnProperty('Address')
            ? ` ${props.accountDetail.data.ContractName}`
            : ''
        }
      />

      <Table columns={columns} dataSource={data} pagination={false} />

      <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
    </div>
  )
})
