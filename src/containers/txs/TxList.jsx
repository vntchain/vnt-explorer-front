import React, { Fragment } from 'react'
import { Spin, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import contractIcon from 'assets/images/合约.png'
import failedIcon from 'assets/images/failed.png'
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
      tx: {
        hash: item.Hash,
        successStatus: item.Status == 1
      },
      height: item.BlockNumber,
      age: calcAge(item.TimeStamp, lang),
      from: {
        isNull: !item.FromDetail ? true : false,
        isToken: item.FromDetail ? item.FromDetail.IsToken : false,
        isContract: item.FromDetail ? item.FromDetail.IsContract : false,
        contractName: item.FromDetail ? item.FromDetail.ContractName : '',
        name: item.FromDetail
          ? item.FromDetail.Vname || item.FromDetail.Address
          : '',
        addr: item.FromDetail ? item.FromDetail.Address : ''
      },
      to: {
        isNull: !item.To ? true : false,
        isToken: item.To ? item.To.IsToken : false,
        isContract: item.To ? item.To.IsContract : false,
        contractName: item.To ? item.To.ContractName : '',
        name: item.To ? item.To.Vname || item.To.Address : '',
        addr: item.To ? item.To.Address : ''
      },
      value: item.Value
    })
  })
  return result
}

const tooltipText = (
  <span>
    <LocalText id="contractToolTip" />
  </span>
)

const getSliceName = name =>
  name.length > 12 ? name.slice(0, 12) + '...' : name

const renderSendAndReceive = ({
  isNull,
  isToken,
  isContract,
  name,
  addr,
  contractName
}) => {
  if (isNull) {
    return '-'
  }

  if (isToken || isContract) {
    var url = isToken ? '/token/' : '/contract/'
    url = url + addr
    return (
      <Tooltip title={tooltipText} placement="bottom">
        <Link to={url}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className="contractIcon"
              src={contractIcon}
              alt="contract icon"
            />
            &nbsp;
            {contractName || getSliceName(name)}
          </div>
        </Link>
      </Tooltip>
    )
  }

  return <Link to={`/account/${addr}`}>{getSliceName(name)}</Link>
}

// tx list table data
const columns = [
  {
    title: <LocalText id="tlpColumn1" />,
    dataIndex: 'tx',
    key: 'tx',
    // eslint-disable-next-line react/display-name
    render: tx => (
      <Link to={`/transaction/${tx.hash}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {tx.successStatus ? (
            <span />
          ) : (
            <img
              style={{ width: '.16rem' }}
              src={failedIcon}
              alt="failed icon"
            />
          )}
          &nbsp;
          {tx.hash.slice(0, 12) + '...'}
        </div>
      </Link>
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
    render: renderSendAndReceive
  },
  {
    title: <LocalText id="tlpColumn5" />,
    key: 'to',
    dataIndex: 'to',
    // eslint-disable-next-line react/display-name
    render: renderSendAndReceive
  },
  {
    title: <LocalText id="tlpColumn6" />,
    dataIndex: 'value',
    key: 'value',
    render: value => value + ' VNT'
  }
]
