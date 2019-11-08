import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import SubTitle from 'components/SubTitle'
import BlockListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import apis from 'utils/apis'
import r from 'constants/routes'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function BlockList(props) {
  const { context, currentIndex, language, flipPage } = props

  const finishFetching = context && context.hasOwnProperty('data')

  return (
    <div className={styles.container}>
      <PrimaryTitle id="blpTitle" />

      <Spin spinning={context && context.isLoading}>
        {/* set min-height for the div */}
        <div className={styles.tableWithCount}>
          {finishFetching && (
            <Fragment>
              {/* 请求越界的分页时，data 为 []，count 仍返回总区块数，区块数组件和表单分页栏需要作判断 */}
              <SubTitle
                id="blpSubTitle"
                arg={
                  finishFetching && context.data
                    ? context.data.length === 0
                      ? 0
                      : context.count
                    : '-/-'
                }
              />

              <BlockListTable
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
      blockHeight: item.Number,
      age: calcAge(item.TimeStamp, lang),
      txs:
        item.TxCount > 0 ? (
          <Link to={`${r.txList}/block=${item.Number}`}>{item.TxCount}</Link>
        ) : (
          item.TxCount
        ),
      producer: {
        addr: item.ProducerDetail.Address || item.Producer,
        name:
          item.ProducerDetail.Vname ||
          item.ProducerDetail.Address ||
          item.Producer
      },
      blockReward: item.BlockReward,
      capacity: item.Size + ' bytes'
    })
  })
  return result
}

// block list table data
const columns = [
  {
    title: <LocalText id="blpColumn1" />,
    dataIndex: 'blockHeight',
    key: 'blockHeight',
    // eslint-disable-next-line react/display-name
    render: blockHeight => (
      <Link to={`${apis.block}/${blockHeight}`}>{blockHeight}</Link>
    )
  },
  {
    title: <LocalText id="blpColumn2" />,
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: <LocalText id="blpColumn3" />,
    dataIndex: 'txs',
    key: 'txs'
    // eslint-disable-next-line react/display-name
    /* render: count => {
      return count > 0 ? (
        <Link to={`${r.txList}/block=${count}`}>{count}</Link>
      ) : (
        count
      )
    } */
  },
  {
    title: <LocalText id="blpColumn4" />,
    key: 'producer',
    dataIndex: 'producer',
    // eslint-disable-next-line react/display-name
    render: producer => (
      <Link to={`/account/${producer.addr}`}>{producer.name}</Link>
    )
  },
  {
    title: <LocalText id="blpColumn5" />,
    key: 'blockReward',
    dataIndex: 'blockReward'
  },
  {
    title: <LocalText id="blpColumn6" />,
    dataIndex: 'capacity',
    key: 'capacity'
  }
]
