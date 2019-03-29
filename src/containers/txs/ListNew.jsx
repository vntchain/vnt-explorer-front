import React, { Fragment } from 'react'
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
    const { context, currentIndex, language, dispatch } = props
    const finishFetching = context && context.hasOwnProperty('data')

    const handleFlipPage = p => {
      dispatch(push(`${r.txList}/${p}`))

      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: `${apis.txs}?offset=${(p - 1) * pageSize}&limit=${pageSize}`,
          ns: 'transactions',
          field: 'txs'
        }
      })
    }

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
        isToken: item.To ? item.To.IsToken : false,
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
  // <Link to={`${apis.txs}?block=${height}`}>{height}</Link>
  {
    title: <LocalText id="tlpColumn2" />,
    dataIndex: 'height',
    key: 'height',
    // eslint-disable-next-line react/display-name
    render: height => <Link to={`${apis.block}/${height}`}>{height}</Link>
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
    render: ({ isToken, name, value }) => {
      var isContractCreation = false
      if (isToken && !value) {
        isContractCreation = true
      }

      if (isContractCreation) {
        return ''
      }

      if (isToken) {
        return (
          <Link to={`/contract/${value}`}>
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
    key: 'value'
  }
]
