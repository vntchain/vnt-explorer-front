import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Title from 'components/TitleNew'
import AccountListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
import r from 'constants/routes'
import contractIcon from 'assets/images/合约.png'

import styles from 'containers/Common.scss'

/*
** props.context: null --> {} --> multiple { isLoading } -->
** { error, data, isLoading: boolean, count: int }
*/
export default withLang(
  connect()(function ListNew(props) {
    const { context, currentIndex, dispatch } = props
    const finishFetching = context && context.hasOwnProperty('data')

    const handleFlipPage = p => {
      dispatch(push(`${r.accountList}/${p}`))

      dispatch({
        type: 'dataRelayNew/fetchData',
        payload: {
          path: `${apis.accounts}?offset=${(p - 1) *
            pageSize}&limit=${pageSize}`,
          ns: 'accounts',
          field: 'accounts'
        }
      })
    }

    const genTableData = (data, pageIndex) => {
      if (!Array.isArray(data) || data.length === 0) {
        return []
      }

      const result = []
      // 计算排名
      let index = (pageIndex - 1) * pageSize
      data.forEach((item, i) => {
        result.push({
          index: ++index,
          key: item.Address + i,
          address: { value: item.Address, isContract: item.IsContract },
          balance: item.Balance,
          percentage: item.Percent + '%',
          txCount: item.TxCount
        })
      })
      return result
    }

    return (
      <div className={styles.container}>
        <Title mainTitle="alpTitle" />

        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div className={styles.tableWithCount}>
            {finishFetching && (
              <Fragment>
                {/* 请求越界的分页时，data 为 []，count 仍返回总账户数，账户数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="alpSubTitle"
                  count={context.data.length === 0 ? 0 : context.count}
                />
                <AccountListTable
                  columns={columns}
                  data={genTableData(context.data, currentIndex)}
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

const columns = [
  {
    title: <LocalText id="alpColumn1" />,
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: <LocalText id="alpColumn2" />,
    dataIndex: 'address',
    key: 'address',
    // eslint-disable-next-line react/display-name
    render: ({ isContract, value }) => {
      return (
        <Link to={`/account/${value}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isContract && (
              <Fragment>
                <img src={contractIcon} />
                &nbsp;
              </Fragment>
            )}

            {value + '...'}
          </div>
        </Link>
      )
    }
  },
  {
    title: <LocalText id="alpColumn3" />,
    dataIndex: 'balance',
    key: 'balance'
  },
  {
    title: <LocalText id="alpColumn4" />,
    key: 'percentage',
    dataIndex: 'percentage'
  },
  {
    title: <LocalText id="alpColumn5" />,
    key: 'txCount',
    dataIndex: 'txCount'
  }
]
