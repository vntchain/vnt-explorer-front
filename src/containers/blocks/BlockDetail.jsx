import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PrimaryTitle from 'components/PrimaryTitle'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProviderNew'
import BlockDetailTable from 'components/BaseTable'
import apis from 'utils/apis'

import withLang from 'i18n/withLang'
import { calcAge, formatTime } from 'utils/time'
import textSplit from 'utils/longTextSplitter'
import { trunInterval } from 'constants/config'
import r from 'constants/routes'

const mapStateToProps = ({ blocks: { blockDetail } }) => {
  return {
    blockDetail
  }
}

export default withLang(
  connect(mapStateToProps)(function BlockDetail(props) {
    // 父哈希值翻页
    useEffect(
      () => {
        props.dispatch({
          type: 'dataRelayNew/fetchData',
          payload: {
            path: `${apis.block}/${props.match.params.block}`,
            ns: 'blocks',
            field: 'blockDetail'
          }
        })
      },
      [props.location.pathname]
    )

    return (
      <div>
        <PrimaryTitle
          id="blpTitle"
          options={{
            suffix: `#${props.match.params.block}`,
            requireCopy: false
          }}
        />

        <DataProvider
          options={{
            path: `${apis.block}/${props.match.params.block}`,
            ns: 'blocks',
            field: 'blockDetail'
          }}
          render={data => <DetailTable context={data} lang={props.language} />}
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
          <Link to={`${r.txList}/block=${Number}`}>{TxCount}</Link>
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
        !props.context.isLoading &&
        !props.context.error && (
          <BlockDetailTable
            columns={columns}
            data={data}
            tableType="2colDetail"
            pagination={false}
          />
        )}
    </div>
  )
}
