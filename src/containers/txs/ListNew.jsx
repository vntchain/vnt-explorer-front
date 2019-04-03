import React, { Fragment, useEffect } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Title from 'components/TitleNew'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
import contractIcon from 'assets/images/合约.png'
import r from 'constants/routes'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(
  connect()(function ListNew(props) {
    const { context, currentIndex, filterParam, language, dispatch } = props
    const finishFetching = context && context.hasOwnProperty('data')

    let filter = ''
    if (filterParam) {
      const arr = filterParam.split('&')
      filter = arr[arr.length - 1] + '/'
    }
    const handleFlipPage = p => {
      dispatch(push(`${r.txList}/${filter}${p}`))

      /* dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: `${apis.txs}?offset=${(p - 1) *
            pageSize}&limit=${pageSize}&${filterParam}`,
          ns: 'transactions',
          field: 'txs'
        }
      }) */
    }

    useEffect(
      () => {
        dispatch({
          type: 'dataRelayNew/fetchData',
          payload: {
            path: `${apis.txs}?offset=${(currentIndex - 1) *
              pageSize}&limit=${pageSize}&${filterParam}`,
            ns: 'transactions',
            field: 'txs'
          }
        })
      },
      [location.pathname]
    )

    return (
      <div className={styles.container}>
        <Title mainTitle="tlpTitle" />

        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div className={styles.tableWithCount}>
            {finishFetching && (
              <Fragment>
                {/* 请求越界的分页时，data 为 []，count 仍返回总交易数，交易数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="tlpSubTitle"
                  prefix={filterParam || null}
                  count={
                    context && context.data
                      ? context.data.length === 0
                        ? 0
                        : context.count
                      : '-/-'
                  }
                />

                <TxListTable
                  columns={columns}
                  data={genTableData(context.data, language)}
                  count={context.count}
                  currentIndex={currentIndex}
                  flipPage={handleFlipPage}
                />
              </Fragment>
            )}
          </div>
        </Spin>
        <div />
      </div>
    )
  })
)

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
    render: height => <Link to={`${r.txList}/block=${height}`}>{height}</Link>
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
        var url = isToken?"/token/":"/contract/"
        url = url + value
        return (
          <Link to={url}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={contractIcon} alt="contract icon" />
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
