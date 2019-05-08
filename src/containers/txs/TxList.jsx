import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import contractIcon from 'assets/images/合约.png'
import r from 'constants/routes'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function TxList(props) {
  const { context, currentIndex, filterParam, flipPage, language } = props

  const finishFetching = context && context.hasOwnProperty('data')

  return (
    <div className={styles.container}>
      <PrimaryTitle id="tlpTitle" />

      <Spin spinning={context && context.isLoading}>
        {/* set min-height for the div */}
        <div className={styles.tableWithCount}>
          {finishFetching && (
            <Fragment>
              {/* 请求越界的分页时，data 为 []，count 仍返回总交易数，交易数组件和表单分页栏需要作判断 */}
              <SubTitle
                id="tlpSubTitle"
                arg={
                  finishFetching
                    ? context.data.length === 0
                      ? 0
                      : context.count
                    : '-/-'
                }
                prefix={filterParam || null}
              />

              <TxListTable
                columns={columns}
                data={genTableData(context.data, language)}
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

const genTableData = (data, lang) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  data.forEach((item, i) => {
    result.push({
      key: item.Hash + i,
      tx: item.Hash,
      height: item.BlockNumber,
      age: calcAge(item.TimeStamp, lang),
      from: item.From,
      to: {
        isNull: !item.To ? true : false,
        isToken: item.To ? item.To.IsToken : false,
        isContract: item.To ? item.To.IsContract : false,
        name: item.To ? item.To.ContractName : '',
        value: item.To ? item.To.Address : ''
      },
      value: item.Value
    })
  })
  return result
}

// tx list table data
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
    render: height => <Link to={`${r.blockDetail}/${height}`}>{height}</Link>
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
    render: ({ isNull, isToken, isContract, name, value }) => {
      if (isNull) {
        return '-'
      }

      if (isToken || isContract) {
        var url = isToken ? '/token/' : '/contract/'
        url = url + value
        return (
          <Link to={url}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                className="contractIcon"
                src={contractIcon}
                alt="contract icon"
              />
              &nbsp;
              {name || ' ' + value.slice(0, 12) + '...'}
            </div>
          </Link>
        )
      }

      return <Link to={`/account/${value}`}>{value.slice(0, 12) + '...'}</Link>
    }
  },
  {
    title: <LocalText id="tlpColumn6" />,
    dataIndex: 'value',
    key: 'value',
    render: value => value + ' VNT'
  }
]
