import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

import SubTitle from 'components/SubTitle'
import TxListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(function TabTokenBalanceList(props) {
  const { context, currentIndex, flipPage } = props
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
              <SubTitle id="adpCount3" arg={context.count} underTab={true} />

              <TxListTable
                columns={columns}
                data={genTableData(context.data)}
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
        {token.TokenSymbol || token.Address.slice(0, 12) + '...'}
      </Link>
    )
  },
  {
    title: <LocalText id="adpField2" />,
    dataIndex: 'balance',
    key: 'balance'
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
