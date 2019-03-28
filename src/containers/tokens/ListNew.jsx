import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Title from 'components/TitleNew'
import TokenListTable from 'components/BaseTable'
import LocalText from 'i18n/LocalText'
import withLang from 'i18n/withLang'
import apis from 'utils/apis'
import { pageSize } from 'constants/config'
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
      dispatch(push(`${r.tokenList}/${p}`))

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
          address: item.Address,
          tokenAmount: item.TokenAmount,
          acctCount: item.TokenAcctCount,
          title: {
            address: item.Address,
            contractName: item.ContractName,
            tokenSymbol: item.TokenSymbol
          }
        })
      })
      return result
    }

    return (
      <div className={styles.container}>
        <Title mainTitle="tklpTitle" />

        <Spin spinning={context && context.isLoading}>
          {/* set min-height for the div */}
          <div className={styles.tableWithCount}>
            {finishFetching && (
              <Fragment>
                {/* 请求越界的分页时，data 为 []，count 仍返回总代币数，代币数组件和表单分页栏需要作判断 */}
                <Title
                  subTitle="tklpSubTitle"
                  count={context.data.length === 0 ? 0 : context.count}
                />

                <TokenListTable
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
    title: <LocalText id="tklpColumn0" />,
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: <LocalText id="tklpTitle" />,
    dataIndex: 'title',
    key: 'title',
    // eslint-disable-next-line react/display-name
    render: title => (
      <Link to={`/token/${title.address}`}>
        {title.contractName}({title.tokenSymbol})
      </Link>
    )
  },
  {
    title: <LocalText id="tklpColumn1" />,
    dataIndex: 'tokenAmount',
    key: 'tokenAmount'
  },
  {
    title: <LocalText id="tklpColumn2" />,
    dataIndex: 'acctCount',
    key: 'acctCount'
  },
  {
    title: <LocalText id="tklpColumn3" />,
    key: 'address',
    dataIndex: 'address'
  }
]
