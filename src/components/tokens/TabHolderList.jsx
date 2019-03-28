import React, { Fragment, useState } from 'react'
import { Spin } from 'antd'
// eslint-disable-next-line
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

    const [current, setCurrent] = useState(1)

    const handleFlipPage = p => {
      setCurrent(p)
      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: props.basePath + `&offset=${(parseInt(p, 10) - 1) * pageSize}`,
          ns: 'tokens',
          field: 'holders'
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
                  subTitle="tkdpSubTitle"
                  count={context.data.length === 0 ? 0 : context.count}
                  titleUnderTab={true}
                />

                <TxListTable
                  columns={columns}
                  data={genTableData(context.data, current)}
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

const genTableData = (data, p) => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const result = []
  var index = (p - 1) * pageSize
  data.forEach((item, i) => {
    result.push({
      key: i,
      token: ++index,
      balance: item.Account.Address,
      price: item.Balance,
      valueInVNT: item.Percent + '%'
    })
  })
  return result
}

const columns = [
  {
    title: <LocalText id="tkdphField1" />,
    dataIndex: 'token',
    key: 'token'
  },
  {
    title: <LocalText id="tkdphField2" />,
    dataIndex: 'balance',
    key: 'balance',
    // eslint-disable-next-line react/display-name
    render: addr => <Link to={`/account/${addr}`}>{addr}</Link>
  },
  {
    title: <LocalText id="tkdphField3" />,
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: <LocalText id="tkdphField4" />,
    key: 'valueInVNT',
    dataIndex: 'valueInVNT'
  }
]
