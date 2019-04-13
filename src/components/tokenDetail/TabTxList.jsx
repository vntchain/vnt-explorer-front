import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function TabTxList(props) {
  const { context, address, language, currentIndex, flipPage } = props
  const finishFetching = context && context.hasOwnProperty('data')

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
                data={genTableData(context.data, address, language)}
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

const genTableData = (data, address, language) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  data.forEach((item, i) => {
    var d = {
      key: item.Hash + i,
      tx: item.Hash,
      blockNumber: item.BlockNumber,
      age: calcAge(item.TimeStamp, language),
      tokenFrom: item.TokenFrom,
      tokenTo: item.TokenTo,
      tokenAmount: item.TokenAmount
    }

    if (item.To) {
      d.to = {
        address: item.To.Address
      }
    } else {
      d.to = {
        address: null
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
    dataIndex: 'blockNumber',
    key: 'blockNumber',
    // eslint-disable-next-line react/display-name
    render: bn => <Link to={`/block/${bn}`}>{bn}</Link>
  },
  {
    title: <LocalText id="tlpColumn3" />,
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: <LocalText id="tlpColumn4" />,
    key: 'tokenFrom',
    dataIndex: 'tokenFrom',
    // eslint-disable-next-line react/display-name
    render: from => {
      if (from) {
        return <Link to={`/account/${from}`}>{from.slice(0, 12) + '...'}</Link>
      } else {
        return '-'
      }
    }
  },
  {
    title: <LocalText id="tlpColumn5" />,
    key: 'tokenTo',
    dataIndex: 'tokenTo',
    // eslint-disable-next-line react/display-name
    render: tokenTo => {
      if (tokenTo) {
        return (
          <Link to={`/account/${tokenTo}`}>{tokenTo.slice(0, 12) + '...'}</Link>
        )
      } else {
        return '-'
      }
    }
  },
  {
    title: <LocalText id="tkdpField3" />,
    dataIndex: 'tokenAmount',
    key: 'tokenAmount'
  }
]
