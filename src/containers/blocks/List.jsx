import React from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'

import styles from 'containers/Common.scss'

const mapStateToProps = ({ blocks: { count } }) => {
  return {
    count
  }
}

export default connect(mapStateToProps)(function BlockList(props) {
  const urlPath = location.pathname.split('/').filter(item => item)
  let currentIndex = 1
  if (urlPath.length > 0 && !isNaN(parseInt(urlPath[urlPath.length - 1], 10))) {
    currentIndex = parseInt(urlPath[urlPath.length - 1], 10)
  }

  return (
    <div>
      <DataProvider
        options={{
          path: apis.blockCount,
          ns: 'blocks',
          field: 'count'
        }}
        render={data => (
          <Title titleID="blpTitle" subTitleID="blpSubTitle" context={data} />
        )}
      />
      {props.count &&
        props.count.data &&
        props.count.data > 0 && (
          <DataProvider
            options={{
              path: `${apis.blocks}?offset=${(currentIndex - 1) * 20}&limit=20`,
              ns: 'blocks',
              field: 'blocks'
            }}
            render={data => (
              <PagedTable
                size={props.count.data}
                context={data}
                dispatch={props.dispatch}
                currentIndex={currentIndex}
                changePath={path => props.dispatch(push(path))}
              />
            )}
          />
        )}
    </div>
  )
})

function PagedTable(props) {
  const handlePageChange = e => {
    if (e !== props.currentIndex) {
      props.changePath(`${apis.blocks}/${e}`)
    }
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: `${apis.blocks}?offset=${(e - 1) * 20}&limit=20`,
        ns: 'blocks',
        field: 'blocks'
      }
    })
  }

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

  const data = []
  if (
    props.context &&
    props.context.data &&
    Array.isArray(props.context.data)
  ) {
    props.context.data.forEach((item, i) => {
      data.push({
        key: item.Hash + i,
        blockHeight: item.Number,
        age: item.TimeStamp,
        txs: item.TxCount,
        producer: item.Producer,
        blockReward: item.BlockReward,
        capacity: item.Size + ' bytes'
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
        pageSize: 20,
        total: props.size,
        showQuickJumper: true,
        onChange: handlePageChange,
        current: props.currentIndex
      }}
    />
  )
}
