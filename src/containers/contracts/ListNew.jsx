import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Title from 'components/TitleNew'
import ContractListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
import contractIcon from 'assets/images/合约.png'
import r from 'constants/routes'

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
      dispatch(push(`${r.contractList}/${p}`))

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

    const genTableData = data => {
      if (!Array.isArray(data) || data.length === 0) {
        return []
      }

      const result = []
      // 计算排名
      // let index = (pageIndex - 1) * pageSize
      data.forEach((item, i) => {
        result.push({
          key: item.Address + i,
          address: item.Address,
          cname: item.ContractName,
          balance: item.Balance,
          txCount: item.TxCount
        })
      })
      return result
    }

    return (
      <div className={styles.container}>
        <Title mainTitle="clpTitle" />

        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div className={styles.tableWithCount}>
            {finishFetching && (
              <Fragment>
                {/* 请求越界的分页时，data 为 []，count 仍返回总合约数，合约数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="clpSubTitle"
                  count={context.data.length === 0 ? 0 : context.count}
                />

                <ContractListTable
                  columns={columns}
                  data={genTableData(context.data)}
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
    title: <LocalText id="clpColumn1" />,
    dataIndex: 'address',
    key: 'address',
    // eslint-disable-next-line react/display-name
    render: addr => (
      <Link to={`/contract/${addr}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={contractIcon} /> &nbsp;
          {addr}
        </div>
      </Link>
    )
  },
  {
    title: <LocalText id="clpColumn2" />,
    dataIndex: 'cname',
    key: 'cname'
  },
  {
    title: <LocalText id="clpColumn3" />,
    dataIndex: 'balance',
    key: 'balance'
  },
  {
    title: <LocalText id="clpColumn4" />,
    key: 'txCount',
    dataIndex: 'txCount'
  }
]
