import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import Tabs from 'components/Tabs'
import TxList from 'components/txs/TxList'
import TokenTxList from 'components/tokens/TokenTxList'
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
      title: <LocalText id="adpField2" />,
      dataIndex: 'fieldName',
      key: 'fieldName'
    },
    {
      title:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('Balance')
          ? `${props.accountDetail.data.Balance}`
          : '-/-',
      dataIndex: 'value',
      key: 'value'
    }
  ]

  const data = [
    {
      key: 'txs',
      fieldName: <LocalText id="adpField3" />,
      value:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('TxCount')
          ? `${props.accountDetail.data.TxCount}`
          : '-/-'
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
              path:
                `${apis.txCount}?account=` + location.pathname.split('/')[2],
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
              <TxList
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
      btnName: <LocalText id="adpField5" />,
      comp: (
        <Fragment key="2">
          {/* 获取当前账户所有代币交易，为计算交易数 */}
          <DataProvider
            options={{
              path:
                `${apis.txCount}?isToken=1&account=` +
                location.pathname.split('/')[2],
              ns: 'transactions',
              field: 'count'
            }}
            render={data => (
              <TxCount
                id="adpCount2"
                context={data}
                dispatch={props.dispatch}
              />
            )}
          />
          {/* 获取当前账户第一分页的代币交易 */}
          <DataProvider
            options={{
              path:
                `${apis.txs}?isToken=1&limit=${pageSize}&offset=0&account=` +
                location.pathname.split('/')[2],
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <TokenTxList
                context={data}
                dispatch={props.dispatch}
                basePath={
                  `${apis.txs}?isToken=1&limit=${pageSize}&account=` +
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
      btnName: <LocalText id="adpField6" />,
      comp: (
        <Fragment key="3">
          {/* 获取当前账户所有交易，为计算交易数 */}
          <DataProvider
            options={{
              path: `${apis.accountDetail}/${
                props.match.params.acct
              }/tokens/count`,
              ns: 'accounts',
              field: 'tokenCount'
            }}
            render={data => (
              <TokenCount
                id="adpCount3"
                context={data}
                dispatch={props.dispatch}
              />
            )}
          />
          {/* 获取当前账户第一分页的交易 */}
          <DataProvider
            options={{
              path: `${apis.accountDetail}/${props.match.params.acct}/tokens`,
              ns: 'accounts',
              field: 'tokens'
            }}
            render={data => (
              <TokenList
                context={data}
                dispatch={props.dispatch}
                basePath={`${apis.accountDetail}/${
                  props.match.params.acct
                }/tokens`}
              />
            )}
          />
        </Fragment>
      )
    }
    // {
    //   btnName: <LocalText id="cdpField1" />,
    //   comp: <p>tab 4</p>
    // }
  ]

  return (
    <div>
      <Title
        titleID="adpField1"
        suffix={
          props.accountDetail &&
          props.accountDetail.data &&
          props.accountDetail.data.hasOwnProperty('Address')
            ? ` # ${props.accountDetail.data.Address}`
            : ''
        }
      />

      <Table columns={columns} dataSource={data} pagination={false} />

      <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
    </div>
  )
})
