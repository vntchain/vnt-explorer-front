import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Spin } from 'antd'
import { push } from 'react-router-redux'

import PrimaryTitle from 'components/PrimaryTitle'
import PageProvider from 'containers/PageProvider'
import TabTxList from 'components/accountDetail/TabTxList'
import TabTokenTxList from 'components/accountDetail/TabTokenTxList'
import TabTokenBalanceList from 'components/accountDetail/TabTokenBalanceList'
import BriefTable from 'components/BaseTable'

import LocalText from 'i18n/LocalText'
import DataProviderNew from 'containers/RPDataProviderNew'
import Tabs from 'components/Tabs'
import Margin from 'components/Margin'
import r from 'constants/routes'

import styles from 'containers/Wallet.scss'

import apis from 'utils/apis'
import { pageSize } from 'constants/config'

const mapStateToProps = ({
  accounts: { accountDetail },
  auth: { account }
}) => {
  return {
    accountDetail,
    account
  }
}

export default connect(mapStateToProps)(function WalletAccount(props) {
  const { accountDetail } = props

  // 点击发送方、接收方链接时更新表单数据
  useEffect(() => {
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        // path: `${apis.accountDetail}/${props.match.params.acct}`,
        path: `${apis.accountDetail}/${props.account.address}`,
        ns: 'accounts',
        field: 'accountDetail'
      }
    })
  }, [])

  const columns = [
    {
      title: <LocalText id="waField1" />,
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
      key: 'address',
      fieldName: <LocalText id="waField2" />,
      value: props.account.address
    },
    {
      key: 'send-receive',
      fieldName: <LocalText id="waField3" />,
      value: (
        <div>
          <Button
            className={styles.btn}
            style={{ backgroundColor: '#4cc159', borderColor: '#4cc159' }}
            type="primary"
            onClick={() => props.dispatch(push(r.send))}
          >
            <LocalText id="waBtn1" />
          </Button>
          <Button
            className={styles.btn}
            type="primary"
            onClick={() => props.dispatch(push(r.receive))}
          >
            <LocalText id="waBtn2" />
          </Button>
        </div>
      )
    }
  ]

  // const testAccount = '0x122369f04f32269598789998de33e3d56e2c507a'
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
                props.account.address,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <PageProvider
                comp={TabTxList}
                options={{
                  basePath:
                    `${apis.txs}?limit=${pageSize}&account=` +
                    props.account.address,
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
                props.account.address,
              ns: 'transactions',
              field: 'filteredTxs'
            }}
            render={data => (
              <PageProvider
                comp={TabTokenTxList}
                options={{
                  basePath:
                    `${apis.txs}?isToken=1&limit=${pageSize}&account=` +
                    props.account.address,
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
                props.account.address
              }/tokens?limit=${pageSize}&offset=0`,
              ns: 'accounts',
              field: 'tokens'
            }}
            render={data => (
              <PageProvider
                comp={TabTokenBalanceList}
                options={{
                  basePath: `${apis.accountDetail}/${
                    props.account.address
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
  ]

  return (
    <div>
      <PrimaryTitle id="waTitle" />

      <Spin spinning={accountDetail && accountDetail.isLoading}>
        <div className={styles.tabTableContainer}>
          <BriefTable
            columns={columns}
            data={data}
            tableType="2colDetail"
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

/* import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import Title from 'components/PrimaryTitle'
import index from 'utils/locale'

import styles from 'containers/Wallet.scss'

const docs = {
  title: ['钱包账户', 'Account'],
  row1: ['可用余额', 'Balance'],
  row2: ['地址', 'Address'],
  row3: ['发送/接收', 'Send/Receive']
}

const mapStateToProps = ({ global: { language } }) => {
  return {
    language
  }
}

export default connect(mapStateToProps)(function Account(props) {
  return (
    <div className={styles.main}>
      <Title id="waTitle" />

      <table className={styles.overview}>
        <tbody>
          <tr>
            <td>{docs.row1[index(props.language)] + ':'}</td>
            <td>
              190,799,314.
              <span>8191446255192630</span> VNT
            </td>
          </tr>
          <tr>
            <td>{docs.row2[index(props.language)] + ':'}</td>
            <td>
              0x19b685a1b66b4bd65660dbfd274721c2dda8a66a20c8fda8d4150c9a6474569d
            </td>
          </tr>
          <tr>
            <td>{docs.row3[index(props.language)] + ':'}</td>
            <td>
              <Button
                style={{ backgroundColor: '#4cc159', borderColor: '#4cc159' }}
                type="primary"
              >
                {docs.row3[index(props.language)].split('/')[0]}
              </Button>
              <Button type="primary">
                {docs.row3[index(props.language)].split('/')[1]}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})
 */
