import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Title from 'components/Title'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProvider'
import apis from 'utils/apis'
import ErrorMessenger from 'components/ErrorMessenger'

import withLang from 'i18n/withLang'
import { calcAge, formatTime } from 'utils/time'
import textSplit from 'utils/longTextSplitter'
import { trunInterval } from 'constants/config'

import styles from 'containers/Common.scss'

const mapStateToProps = ({ blocks: { blockDetail } }) => {
  return {
    blockDetail
  }
}

export default withLang(
  connect(mapStateToProps)(function BlockDetail(props) {
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
              lang={props.language}
            />
          )}
        />
      </div>
    )
  })
)

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
      ExtraData,
      Number
    } = props.context.data
    data.push({
      key: 'timeStamp',
      fieldName: <LocalText id="bdpField1" />,
      value: `${calcAge(TimeStamp, props.lang)} (${formatTime(TimeStamp)})`
    })
    data.push({
      key: 'txCount',
      fieldName: <LocalText id="bdpField2" />,
      value:
        TxCount > 0 ? (
          <Link to={`/txs?block=${Number}`}>{TxCount}</Link>
        ) : (
          TxCount
        )
    })
    data.push({
      key: 'hash',
      fieldName: <LocalText id="bdpField3" />,
      value: Hash
    })
    data.push({
      key: 'parentHash',
      fieldName: <LocalText id="bdpField4" />,
      value: <Link to={`${apis.block}/${Number - 1}`}>{ParentHash}</Link>
    })
    data.push({
      key: 'producer',
      fieldName: <LocalText id="bdpField5" />,
      value: <Link to={`/account/${Producer}`}>{Producer}</Link>
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
      value: (
        <div>
          {textSplit(ExtraData, trunInterval).map(item => (
            <p style={{ marginBottom: '0', lineHeight: '1' }} key={item}>
              {item}
            </p>
          ))}
        </div>
      )
    })
  }

  return (
    <div>
      {props.context &&
        props.context.error && <Fragment>{props.errComp}</Fragment>}

      {props.context &&
        !props.context.error && (
          <Table
            className={styles.revTable}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        )}
    </div>
  )
}
