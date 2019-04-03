import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Title from 'components/TitleNew'
import { Table, Spin } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import DataProviderNew from 'containers/RPDataProviderNew'
import Tabs from 'components/Tabs'
import TokenTxList from 'components/tokens/TabTokenTxListTk'
import HolderList from 'components/tokens/TabHolderList'
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
          path: `${apis.accountDetail}/${props.match.params.toke}`,
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
          ? `${props.accountDetail.data.TokenAmount} ${
              props.accountDetail.data.TokenSymbol
            } `
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
        props.accountDetail.data.hasOwnProperty('Address') ? (
          <Link to={`/contract/${props.accountDetail.data.Address}`}>
            {props.accountDetail.data.Address}
          </Link>
        ) : (
          '-/-'
        ),
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
          ? `${props.accountDetail.data.TokenAcctCount}`
          : '-/-',
      col3: <LocalText id="tklpColumn7" />,
      col4:
        props.accountDetail &&
        props.accountDetail.data &&
        props.accountDetail.data.Home ? (
          <Link to={`/token/${props.accountDetail.data.Home}`}>
            {props.accountDetail.data.Home}
          </Link>
        ) : (
          '--'
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
                `${apis.txs}?limit=${pageSize}&isToken=1&offset=0&account=` +
                props.match.params.toke,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <Fragment>
                <TokenTxList
                  context={data}
                  basePath={
                    `${apis.txs}?limit=${pageSize}&isToken=1&account=` +
                    props.match.params.toke
                  }
                  address={props.match.params.toke}
                />
              </Fragment>
            )}
          />
        </Fragment>
      )
    },
    {
      btnName: <LocalText id="tkdpField2" />,
      comp: (
        <Fragment key="2">
          {/* 获取当前账户第一分页的代币 */}
          <DataProviderNew
            options={{
              path: `${apis.token}/${
                props.match.params.toke
              }/holders?limit=${pageSize}`,
              ns: 'tokens',
              field: 'holders'
            }}
            render={data => (
              <HolderList
                context={data}
                basePath={`${apis.accountDetail}/${
                  props.match.params.toke
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
        mainTitle="tklpTitle"
        suffix={
          props.accountDetail &&
          props.accountDetail.data &&
          props.accountDetail.data.hasOwnProperty('TokenSymbol')
            ? ` ${props.accountDetail.data.TokenSymbol}`
            : ''
        }
        fieldWidth={0.64}
      />

      <Spin spinning={accountDetail && accountDetail.isLoading}>
        <div className={styles.tabTableContainer}>
          <Table
            className={styles.revTable2C}
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
