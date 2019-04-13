import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import PageProvider from 'containers/PageProvider'
import TabTxList from 'components/tokenDetail/TabTxList'
import TabHolderList from 'components/tokenDetail/TabHolderList'
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
                `${
                  apis.txs
                }?isToken=1&from=token&limit=${pageSize}&offset=0&account=` +
                props.match.params.toke,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <PageProvider
                comp={TabTxList}
                options={{
                  basePath:
                    `${
                      apis.txs
                    }?isToken=1&from=token&limit=${pageSize}&account=` +
                    props.match.params.toke,
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
      btnName: <LocalText id="tkdpField2" />,
      comp: (
        <Fragment key="2">
          {/* 获取当前账户第一分页的代币 */}
          <DataProviderNew
            options={{
              path: `${apis.token}/${
                props.match.params.toke
              }/holders?limit=${pageSize}&offset=0`,
              ns: 'tokens',
              field: 'holders'
            }}
            render={data => (
              <PageProvider
                comp={TabHolderList}
                options={{
                  basePath: `${apis.token}/${
                    props.match.params.toke
                  }/holders?limit=${pageSize}`,
                  ns: 'tokens',
                  field: 'holders'
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
  ]

  return (
    <div>
      <PrimaryTitle
        id="tklpTitle"
        options={{
          suffix:
            props.accountDetail &&
            props.accountDetail.data &&
            props.accountDetail.data.hasOwnProperty('TokenSymbol')
              ? ` ${props.accountDetail.data.TokenSymbol}`
              : '',
          requireCopy: false,
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
