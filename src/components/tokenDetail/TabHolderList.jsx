import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import { pageSize } from 'constants/config'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function TabHolderList(props) {
  const { context, flipPage, currentIndex } = props
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
              <SubTitle id="tkdpSubTitle" arg={context.count} underTab={true} />

              <TxListTable
                columns={columns}
                data={genTableData(context.data, currentIndex)}
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
