import React, { Fragment } from 'react'
import { Spin, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import apis from 'utils/apis'
import contractIcon from 'assets/images/合约.png'
import failedIcon from 'assets/images/failed.png'
import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function TabTxList(props) {
  const { context, address, language, flipPage, currentIndex } = props
  const finishFetching = context && context.hasOwnProperty('data')
  const comparedAddr = location.pathname.split('/').filter(item => item)[1]
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
              <SubTitle id="tlpSubTitle" arg={context.count} underTab={true} />

              <TxListTable
                columns={columns}
                data={genTableData(
                  context.data,
                  address,
                  language,
                  comparedAddr
                )}
                count={context.count}
                currentIndex={currentIndex}
                flipPage={flipPage}
                tableType="tabList"
              />
            </Fragment>
          )}
        </div>
      </Spin>
      <div />
    </div>
  )
})

const genTableData = (data, address, language, comparedAddr) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  data.forEach((item, i) => {
    let d = {
      key: item.Hash + i,
      tx: {
        hash: item.Hash,
        successStatus: item.Status == 1
      },
      height: item.BlockNumber,
      age: calcAge(item.TimeStamp, language),
      from: {
        address: item.From,
        redirect: item.From !== comparedAddr,
        isContract: item.FromDetail ? item.FromDetail.IsContract : false,
        contractName: item.FromDetail ? item.FromDetail.ContractName : '',
        isToken: item.FromDetail ? item.FromDetail.IsToken : false,
        name: item.FromDetail ? item.FromDetail.Vname || item.To.Address : ''
      },
      to: {
        isContract: item.To ? item.To.IsContract : false,
        contractName: item.To ? item.To.ContractName : '',
        isToken: item.To ? item.To.IsToken : false,
        address: item.To ? item.To.Address : '',
        name: item.To ? item.To.Vname || item.To.Address : '',
        redirect: item.To ? item.To.Address !== comparedAddr : false
      },
      value: item.Value
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

const tooltipText = (
  <span>
    <LocalText id="contractToolTip" />
  </span>
)

const renderSendAndReceive = ({
  isContract,
  isToken,
  address,
  name,
  contractName,
  redirect
}) => {
  if (!address) {
    return '-'
  }

  if (isToken || isContract) {
    let url = isToken ? '/token/' : '/contract/'
    url = url + address
    return (
      <Tooltip title={tooltipText} placement="bottom">
        <Link to={url}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className="contractIcon" src={contractIcon} />
            &nbsp;
            {contractName || ' ' + name.slice(0, 12) + '...'}
          </div>
        </Link>
      </Tooltip>
    )
  }

  return redirect ? (
    <Link to={`/account/${address}`}>{name.slice(0, 12) + '...'}</Link>
  ) : (
    name.slice(0, 12) + '...'
  )
}

const columns = [
  {
    title: <LocalText id="tlpColumn1" />,
    dataIndex: 'tx',
    key: 'tx',
    // eslint-disable-next-line react/display-name
    render: tx => (
      <Link to={`/transaction/${tx.hash}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!tx.successStatus && (
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
    render: renderSendAndReceive
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
    render: renderSendAndReceive
  },
  {
    title: <LocalText id="tlpColumn6" />,
    dataIndex: 'value',
    key: 'value',
    render: value => value + ' VNT'
  }
]
