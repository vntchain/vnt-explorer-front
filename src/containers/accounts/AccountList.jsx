import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import SubTitle from 'components/SubTitle'
import AccountListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { pageSize } from 'constants/config'

import styles from 'containers/Common.scss'

import { formatAddr, formatVname, setBalancePrecision } from 'utils/common'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function AccountList(props) {
  const { context, currentIndex, flipPage } = props
  const finishFetching = context && context.hasOwnProperty('data')

  const genTableData = (data, pageIndex) => {
    if (!Array.isArray(data) || data.length === 0) {
      return []
    }

    const result = []
    // 计算排名
    let index = (pageIndex - 1) * pageSize
    data.forEach((item, i) => {
      result.push({
        index: ++index,
        key: item.Address + i,
        address: {
          addr: item.Address,
          name: item.Vname
        },
        balance: setBalancePrecision(item.Balance) + ' VNT',
        percentage: item.Percent + '%',
        txCount: item.TxCount
      })
    })
    return result
  }

  return (
    <div className={styles.container}>
      <PrimaryTitle id="alpTitle" />

      <Spin spinning={context && context.isLoading}>
        {/* set min-height for the div */}
        <div className={styles.tableWithCount}>
          {finishFetching && (
            <Fragment>
              {/* 请求越界的分页时，data 为 []，count 仍返回总账户数，账户数组件和表单分页栏需要作判断 */}
              <SubTitle
                id="alpSubTitle"
                arg={
                  finishFetching
                    ? context.data.length === 0
                      ? 0
                      : context.count
                    : '-/-'
                }
              />
              <AccountListTable
                columns={columns}
                data={genTableData(context.data, currentIndex)}
                count={context.count}
                currentIndex={currentIndex}
                flipPage={flipPage}
                tableType="list"
              />
            </Fragment>
          )}
        </div>
      </Spin>
      <div />
    </div>
  )
})

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
    render: info => {
      return (
        <Link to={`/account/${info.addr}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {formatAddr(info.addr,12,8)}
            {info.name !=='' && info.name !== info.addr ? (
              '  ' +
              `(${
                formatVname(info.name,12)
              })`
            ) : ''}
          </div>
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
