import React, { Fragment, useState } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Title from 'components/TitleNew'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { pageSize } from 'constants/config'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(
  connect()(function ListNew(props) {
    const { context, dispatch } = props
    const finishFetching = context && context.hasOwnProperty('data')

    const [current, setCurrent] = useState(props.currentIndex)

    const handleFlipPage = p => {
      setCurrent(p)
      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: props.basePath + `&offset=${(parseInt(p, 10) - 1) * pageSize}`,
          ns: 'accounts',
          field: 'tokens'
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
                {/* 请求越界的分页时，data 为 []，count 仍返回总代币数，代币数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="adpCount3"
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
                  data={genTableData(context.data)}
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

const genTableData = data => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  data.forEach((item, i) => {
    result.push({
      key: i,
      account: item.Account,
      token: item.Token,
      balance: item.Balance,
      price: '-',
      valueInVNT: '-'
    })
  })
  return result
}

const columns = [
  {
    title: <LocalText id="adpField7" />,
    dataIndex: 'token',
    key: 'token',
    // eslint-disable-next-line react/display-name
    render: token => (
      <Link to={`/token/${token.Address}`}>
        {token.ContractName || token.Address.slice(0, 12) + '...'}
      </Link>
    )
  },
  {
    title: <LocalText id="adpField2" />,
    dataIndex: 'balance',
    key: 'balance'
    // eslint-disable-next-line react/display-name
  },
  {
    title: <LocalText id="adpField8" />,
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: <LocalText id="adpField9" />,
    key: 'valueInVNT',
    dataIndex: 'valueInVNT'
  }
]
