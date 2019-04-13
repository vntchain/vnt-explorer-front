import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import PageProvider from 'containers/PageProvider'
import TabTxList from 'components/contractDetail/TabTxList'
import TabTokenTxList from 'components/contractDetail/TabTokenTxList'
import TabTokenBalanceList from 'components/contractDetail/TabTokenBalanceList'
import BriefTable from 'components/BaseTable'

import LocalText from 'i18n/LocalText'
import DataProviderNew from 'containers/RPDataProviderNew'
import Tabs from 'components/Tabs'

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
          path: `${apis.accountDetail}/${props.match.params.cont}`,
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
    },
    {
      title: <LocalText id="cdpColumn3" />,
      dataIndex: 'fieldName2',
      key: 'fieldName2'
    },
    {
      title:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('ContractOwner') ? (
          <Link to={`/account/${props.accountDetail.data.ContractOwner}`}>{`${
            props.accountDetail.data.ContractOwner
          }`}</Link>
        ) : (
          ''
        ),
      dataIndex: 'value2',
      key: 'value2'
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
          : '-/-',
      fieldName2: <LocalText id="cdpColumn4" />,
      value2:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.hasOwnProperty('InitTx') ? (
          <Link to={`/transaction/${props.accountDetail.data.InitTx}`}>{`${
            props.accountDetail.data.InitTx
          }`}</Link>
        ) : (
          ''
        )
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
                props.match.params.cont,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <PageProvider
                comp={TabTxList}
                options={{
                  basePath:
                    `${apis.txs}?limit=${pageSize}&account=` +
                    props.match.params.cont,
                  ns: 'transactions',
                  field: 'filteredTxs'
                }}
                refreshProof={false}
                context={data}
                currentIndex={1}
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
          {/* 获取当前账户第一分页的代币交易 */}
          <DataProviderNew
            options={{
              path:
                `${apis.txs}?isToken=1&limit=${pageSize}&offset=0&account=` +
                props.match.params.cont,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <PageProvider
                comp={TabTokenTxList}
                options={{
                  basePath:
                    `${apis.txs}?isToken=1&limit=${pageSize}&account=` +
                    props.match.params.cont,
                  ns: 'transactions',
                  field: 'filteredTxs'
                }}
                refreshProof={false}
                context={data}
                currentIndex={1}
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
              path: `${apis.accountDetail}/${
                props.match.params.cont
              }/tokens?limit=${pageSize}&offset=0`,
              ns: 'accounts',
              field: 'tokens'
            }}
            render={data => (
              <PageProvider
                comp={TabTokenBalanceList}
                options={{
                  basePath: `${apis.accountDetail}/${
                    props.match.params.cont
                  }/tokens?limit=${pageSize}`,
                  ns: 'accounts',
                  field: 'tokens'
                }}
                refreshProof={false}
                context={data}
                currentIndex={1}
              />
            )}
          />
        </Fragment>
      )
    }
    // ,{
    //   btnName: <LocalText id="cdpField1" />,
    //   comp: <p>tab 4</p>
    // }
  ]

  return (
    <div>
      {/* address length: 42 */}
      <PrimaryTitle
        id="clpTitle"
        options={{
          suffix: props.match.params.cont,
          requireCopy: true,
          requireQR: false
        }}
      />

      <Spin spinning={accountDetail && accountDetail.isLoading}>
        <div className={styles.tabTableContainer}>
          <BriefTable
            columns={columns}
            data={data}
            tableType="4colDetail"
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
