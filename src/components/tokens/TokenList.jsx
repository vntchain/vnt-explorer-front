import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { connect } from 'react-redux'

import LocalText from 'i18n/LocalText'

import { pageSize } from 'constants/config'

import styles from 'containers/Common.scss'

const mapStateToProps = ({ accounts: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function PagedTable(props) {
  const handlePageChange = e => {
    setCurrent(e)
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: props.basePath + `&offset=${(parseInt(e, 10) - 1) * pageSize}`,
        ns: 'accounts',
        field: 'tokens'
      }
    })
  }

  const [current, setCurrent] = useState(props.currentIndex)

  const columns = [
    {
      title: <LocalText id="adpField7" />,
      dataIndex: 'token',
      key: 'token',
      // eslint-disable-next-line react/display-name
      render: token => (
        <Link to={`/account/${token.Address}`}>
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
    // {
    //   title: <LocalText id="tlpColumn5" />,
    //   key: 'to',
    //   dataIndex: 'to',
    //   // eslint-disable-next-line react/display-name
    //   render: ({ isContract, value }) => {
    //     return isContract ? (
    //       <Link to={`/contract/${value}`}>
    //         <Icon type="project" />
    //         {' ' + value.slice(0, 12) + '...'}
    //       </Link>
    //     ) : (
    //       <Link to={`/account/${value}`}>{value.slice(0, 12) + '...'}</Link>
    //     )
    //   }
    // },
    // {
    //   title: <LocalText id="tlpColumn6" />,
    //   dataIndex: 'value',
    //   key: 'value'
    // }
  ]

  const data = []
  if (
    props.context &&
    props.context.data &&
    Array.isArray(props.context.data)
  ) {
    props.context.data.forEach((item, i) => {
      data.push({
        key: i,
        account: item.Account,
        token: item.Token,
        balance: item.Balance,
        price: '-',
        valueInVNT: '-'
      })
    })
  }

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={data}
      pagination={{
        position: 'both',
        pageSize: pageSize,
        total: props.count && props.count.data ? props.count.data : 0,
        showQuickJumper: true,
        onChange: handlePageChange,
        current
      }}
    />
  )
})
