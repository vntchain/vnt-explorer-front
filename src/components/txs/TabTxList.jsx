import React, { Fragment, useState } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Title from 'components/TitleNew'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
import contractIcon from 'assets/images/合约.png'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(
  connect()(function ListNew(props) {
    const { context, address, language, dispatch } = props
    const finishFetching = context && context.hasOwnProperty('data')

    const [current, setCurrent] = useState(props.currentIndex)

    const handleFlipPage = p => {
      setCurrent(p)
      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: props.basePath + `&offset=${(parseInt(p, 10) - 1) * pageSize}`,
          ns: 'transactions',
          field: 'filteredTxs'
        }
      })
    }

    return (
      <div className={styles.container}>
        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div
            className={styles.tableWithCount}
            style={{ backgroundColor: 'white' }}
          >
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
                  titleUnderTab={true}
                />

                <TxListTable
                  columns={columns}
                  data={genTableData(context.data, address, language)}
                  count={context.count}
                  currentIndex={current}
                  flipPage={handleFlipPage}
                  tableUnderTab={true}
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

const genTableData = (data, address, language) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  data.forEach((item, i) => {
    var d = {
      key: item.Hash + i,
      tx: item.Hash,
      height: item.BlockNumber,
      age: calcAge(item.TimeStamp, language),
      from: item.From,
      value: item.Value
    }

    if (item.To) {
      d.to = {
        isContract: item.To.IsContract,
        isToken: item.To.IsToken,
        address: item.To.Address,
        contractName: item.To.ContractName
      }
    } else {
      d.to = {
        isContract: null,
        isToken: null,
        address: null,
        contractName: null
      }
    }

    if (item.To) {
      if (address == d.from) {
        d.direction = <span style={{ color: '#ff9603' }}>OUT</span>
      } else if (address == d.to.address) {
        d.direction = <span style={{ color: '#4cc159' }}>IN</span>
      } else {
        d.direction = ''
      }
    }
    result.push(d)
  })
  return result
}

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
    title: <LocalText id="blank" />,
    key: 'direction',
    dataIndex: 'direction'
  },
  {
    title: <LocalText id="tlpColumn5" />,
    key: 'to',
    dataIndex: 'to',
    // eslint-disable-next-line react/display-name
    render: ({ isContract, isToken, address, contractName }) => {
      if (!address) {
        return '-'
      }

      if (isToken) {
        return (
          <Link to={`/token/${address}`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={contractIcon} />
              &nbsp;
              {contractName || ' ' + address.slice(0, 12) + '...'}
            </div>
          </Link>
        )
      }

      if (isContract) {
        return (
          <Link to={`/contract/${address}`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={contractIcon} />
              &nbsp;
              {contractName || ' ' + address.slice(0, 12) + '...'}
            </div>
          </Link>
        )
      }

      return (
        <Link to={`/account/${address}`}>{address.slice(0, 12) + '...'}</Link>
      )
    }
  },
  {
    title: <LocalText id="tlpColumn6" />,
    dataIndex: 'value',
    key: 'value',
    render: value => value + ' VNT'
  }
]
