import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'
import ErrorMessenger from 'components/ErrorMessenger'

const mapStateToProps = ({ blocks: { blockDetail } }) => {
  return {
    blockDetail
  }
}

export default connect(mapStateToProps)(function BlockDetail(props) {
  const urlPath = location.pathname.split('/').filter(item => item)
  const currentBlock = urlPath.length > 0 ? urlPath[urlPath.length - 1] : 0

  useEffect(
    () => {
      props.dispatch({
        type: 'dataRelay/fetchData',
        payload: {
          // `path` here not robust
          path: `${apis.block}/${
            props.location.pathname.split('/').filter(item => item)[1]
          }`,
          ns: 'blocks',
          field: 'blockDetail'
        }
      })
    },
    [props.location.pathname]
  )

  return (
    <div>
      <Title
        titleID="blpTitle"
        suffix={
          props.blockDetail &&
          props.blockDetail.data &&
          props.blockDetail.data.hasOwnProperty('Number')
            ? ` # ${props.blockDetail.data.Number}`
            : ''
        }
      />

      <DataProvider
        options={{
          path: `${apis.block}/${currentBlock}`,
          ns: 'blocks',
          field: 'blockDetail'
        }}
        render={data => (
          <DetailTable
            context={data}
            dispatch={props.dispatch}
            errComp={<ErrorMessenger context={data} />}
          />
        )}
      />
    </div>
  )
})

function DetailTable(props) {
  const columns = [
    {
      title: <LocalText id="bdpTitle" />,
      dataIndex: 'fieldName',
      key: 'fieldName'
    },
    {
      title:
        props.context && props.context.data ? props.context.data.Number : '-/-',
      dataIndex: 'value',
      key: 'value'
    }
  ]

  const data = []
  if (props.context && props.context.data) {
    const {
      TimeStamp,
      Hash,
      ParentHash,
      TxCount,
      Producer,
      Size,
      GasUsed,
      GasLimit,
      BlockReward,
      ExtraData
    } = props.context.data
    data.push({
      key: 'timeStamp',
      fieldName: <LocalText id="bdpField1" />,
      value: TimeStamp
    })
    data.push({
      key: 'txCount',
      fieldName: <LocalText id="bdpField2" />,
      value: TxCount
    })
    data.push({
      key: 'hash',
      fieldName: <LocalText id="bdpField3" />,
      value: <Link to={`${apis.block}/${Hash}`}>{Hash}</Link>
    })
    data.push({
      key: 'parentHash',
      fieldName: <LocalText id="bdpField4" />,
      value: <Link to={`${apis.block}/${ParentHash}`}>{ParentHash}</Link>
    })
    data.push({
      key: 'producer',
      fieldName: <LocalText id="bdpField5" />,
      value: Producer
    })
    data.push({
      key: 'size',
      fieldName: <LocalText id="bdpField6" />,
      value: `${Size} bytes`
    })
    data.push({
      key: 'gasUsed',
      fieldName: <LocalText id="bdpField7" />,
      value: GasUsed
    })
    data.push({
      key: 'gasLimit',
      fieldName: <LocalText id="bdpField8" />,
      value: GasLimit
    })
    data.push({
      key: 'blockReward',
      fieldName: <LocalText id="bdpField9" />,
      value: BlockReward
    })
    data.push({
      key: 'extraData',
      fieldName: <LocalText id="bdpField10" />,
      value: ExtraData
    })
  }

  return (
    <div>
      {props.context &&
        props.context.error && <Fragment>{props.errComp}</Fragment>}

      {props.context &&
        !props.context.error && (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
    </div>
  )
}
