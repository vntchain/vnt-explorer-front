import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/AugmTitle'
import { Table, Spin } from 'antd'

import LocalText from 'i18n/LocalText'
import DataProviderNew from 'containers/RPDataProviderNew'
import Tabs from 'components/Tabs'
import TxList from 'components/txs/TabTxList'
import TokenTxList from 'components/tokens/TabTokenTxList'
import TokenList from 'components/tokens/TabTokenList'
import Margin from 'components/Margin'

import styles from 'containers/Common.scss'

import apis from 'utils/apis'
import { pageSize } from 'constants/config'

const mapStateToProps = ({ accounts: { accountDetail } }) => {
  return {
    accountDetail
  }
}

export default connect(mapStateToProps)(function AccountDetail(props) {
  const { accountDetail } = props

  // 点击发送方、接收方链接时更新表单数据
  useEffect(
    () => {
      props.dispatch({
        type: 'dataRelay/fetchData',
        payload: {
          path: `${apis.accountDetail}/${props.match.params.acct}`,
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
          ? `${props.accountDetail.data.Balance} VNT`
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
          {/* 获取当前账户第一分页的交易 */}
          <DataProviderNew
            options={{
              path:
                `${apis.txs}?limit=${pageSize}&offset=0&account=` +
                props.match.params.acct,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <Fragment>
                <TxList
                  context={data}
                  basePath={
                    `${apis.txs}?limit=${pageSize}&account=` +
                    props.match.params.acct
                  }
                  address={props.match.params.acct}
                />
              </Fragment>
            )}
          />
        </Fragment>
      )
    },
    {
      btnName: <LocalText id="adpField5" />,
      comp: (
        <Fragment key="2">
          {/* 获取当前账户第一分页的代币交易 */}
          <DataProviderNew
            options={{
              path:
                `${apis.txs}?isToken=1&limit=${pageSize}&offset=0&account=` +
                props.match.params.acct,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <TokenTxList
                context={data}
                basePath={
                  `${apis.txs}?isToken=1&limit=${pageSize}&account=` +
                  props.match.params.acct
                }
                address={props.match.params.acct}
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
          {/* 获取当前账户第一分页的代币 */}
          <DataProviderNew
            options={{
              path: `${apis.accountDetail}/${props.match.params.acct}/tokens`,
              ns: 'accounts',
              field: 'tokens'
            }}
            render={data => (
              <TokenList
                context={data}
                basePath={`${apis.accountDetail}/${
                  props.match.params.acct
                }/tokens`}
              />
            )}
          />
        </Fragment>
      )
    }
  ]

  return (
    <div>
      {/* address length: 42 */}
      <Title
        titleID="adpField1"
        suffix={props.match.params.acct}
        fieldWidth={0.64}
      />

      <Spin spinning={accountDetail && accountDetail.isLoading}>
        <div className={styles.tabTableContainer}>
          <Table
            className={styles.revTable}
            columns={columns}
            dataSource={data}
            pagination={false}
          />

          <Margin size="medium" />
          {accountDetail &&
            !accountDetail.isLoading && (
              <Tabs key={Date.now()} tabs={tabs} dispatch={props.dispatch} />
            )}
        </div>
      </Spin>
    </div>
  )
})
