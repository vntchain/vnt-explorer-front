import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Title from 'components/TitleNew'
import BlockListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { calcAge } from 'utils/time'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'

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
      dispatch(push(`/blocks-new/${p}`))

      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: `${apis.blocks}?offset=${(p - 1) * pageSize}&limit=${pageSize}`,
          ns: 'blocks',
          field: 'blocks'
        }
      })
    }

    return (
      <div className={styles.container}>
        <Title mainTitle="blpTitle" />

        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div className={styles.tableWithCount}>
            {finishFetching && (
              <Fragment>
                {/* 请求不存在的区块时，data 为 []，count 仍返回总区块数，区块数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="blpSubTitle"
                  count={context.data.length === 0 ? 0 : context.count}
                />

                <BlockListTable
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
      blockHeight: item.Number,
      age: calcAge(item.TimeStamp, lang),
      txs: item.TxCount,
      producer: item.Producer,
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
  },
  {
    title: <LocalText id="blpColumn4" />,
    key: 'producer',
    dataIndex: 'producer',
    // eslint-disable-next-line react/display-name
    render: producer => <Link to={`/account/${producer}`}>{producer}</Link>
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
