import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import PrimaryTitle from 'components/PrimaryTitle'
import LocalText from 'i18n/LocalText'
import DataProvider from 'containers/RPDataProviderNew'
import apis from 'utils/apis'
import TxDetailTable from 'components/BaseTable'

import withLang from 'i18n/withLang'
import { calcAge, formatTime } from 'utils/time'
import textSplit from 'utils/longTextSplitter'
import { trunInterval } from 'constants/config'

const mapStateToProps = ({ transactions: { txDetail } }) => {
  return {
    txDetail
  }
}

export default withLang(
  connect(mapStateToProps)(function TxDetail(props) {
    useEffect(
      () => {
        props.dispatch({
          type: 'dataRelayNew/fetchData',
          payload: {
            path: `${apis.tx}/${props.match.params.tx}`,
            ns: 'transactions',
            field: 'txDetail'
          }
        })
      },
      [props.location.pathname]
    )

    return (
      <div>
        <PrimaryTitle
          id="tdpTitle"
          options={{
            suffix: props.match.params.tx,
            requireCopy: true,
            requireQR: false
          }}
        />

        <DataProvider
          options={{
            path: `${apis.tx}/${props.match.params.tx}`,
            ns: 'transactions',
            field: 'txDetail'
          }}
          render={data => (
            <DetailTable
              context={data}
              dispatch={props.dispatch}
              lang={props.language}
            />
          )}
        />
      </div>
    )
  })
)

function genSendAndReceiveData(dataSrc) {
  if (!dataSrc) {
    return '-'
  }

  if (dataSrc.IsToken) {
    return (
      <Fragment>
        <LocalText id="tdpField16" />
        <Link to={`/token/${dataSrc.Address}`}>
          <Icon type="project" /> {dataSrc.Vname || dataSrc.Address}
        </Link>{' '}
        ({dataSrc.ContractName})
      </Fragment>
    )
  }

  if (dataSrc.IsContract) {
    return (
      <Fragment>
        <LocalText id="tdpField15" />
        <Link to={`/contract/${dataSrc.Address}`}>
          <Icon type="project" /> {dataSrc.Vname || dataSrc.Address}
        </Link>
      </Fragment>
    )
  }

  return (
    <Link to={`/account/${dataSrc.Address}`}>
      {dataSrc.Vname || dataSrc.Address}
    </Link>
  )
}

function DetailTable(props) {
  const columns = [
    {
      title: <LocalText id="tdpField1" />,
      dataIndex: 'fieldName',
      key: 'fieldName'
    },
    {
      title:
        props.context && props.context.data ? props.context.data.Hash : '-/-',
      dataIndex: 'value',
      key: 'value'
    }
  ]

  const data = []
  if (props.context && props.context.data) {
    const {
      TimeStamp,
      Status,
      BlockNumber,
      From,
      FromDetail,
      To,
      IsToken,
      TokenTo,
      TokenAmount,
      GasUsed,
      GasLimit,
      GasPrice,
      Nonce,
      Input,
      Value,
      Index
    } = props.context.data
    // eslint-disable-next-line
    //console.log(props.context.data)
    data.push({
      key: 'status',
      fieldName: <LocalText id="tdpField2" />,
      value:
        Status === 1 ? (
          <span style={{ color: 'green' }}>
            <LocalText id="txSuccess" />
          </span>
        ) : (
          <span style={{ color: 'red' }}>
            <LocalText id="txFailed" />
          </span>
        )
    })
    data.push({
      key: 'height',
      fieldName: <LocalText id="tdpField3" />,
      value: <Link to={`${apis.block}/${BlockNumber}`}>{BlockNumber}</Link>
    })
    data.push({
      key: 'timestamp',
      fieldName: <LocalText id="tdpField4" />,
      value: `${calcAge(TimeStamp, props.lang)} (${formatTime(TimeStamp)})`
    })
    data.push({
      key: 'from',
      fieldName: <LocalText id="tdpField5" />,
      value: genSendAndReceiveData(FromDetail)
    })
    data.push({
      key: 'to',
      fieldName: <LocalText id="tdpField6" />,
      value: genSendAndReceiveData(To)
    })
    data.push({
      key: 'transfer',
      fieldName: <LocalText id="tdpField7" />,
      value:
        TokenTo !== '' && IsToken === true ? (
          <Fragment>
            <LocalText id="tdpField5" />
            <Link to={`/account/${From}`}>
              {From.slice(0, 12) + '...'}
            </Link>{' '}
            <LocalText id="tdpField6" />{' '}
            <Link to={`/account/${TokenTo}`}>
              {TokenTo.slice(0, 12) + '...'}
            </Link>
            <LocalText id="tdpField14" /> {TokenAmount}{' '}
            <Link to={`/token/${To.Address}`}>{To.TokenSymbol}</Link>
          </Fragment>
        ) : (
          '-'
        )
    })
    data.push({
      key: 'value',
      fieldName: <LocalText id="tdpField8" />,
      value: Value + ' VNT'
    })
    data.push({
      key: 'gasLimit',
      fieldName: <LocalText id="tdpField9" />,
      value: GasLimit
    })
    data.push({
      key: 'gasUsed',
      fieldName: <LocalText id="tdpField10" />,
      value: GasUsed
    })
    data.push({
      key: 'gasPrice',
      fieldName: <LocalText id="tdpField11" />,
      value: GasPrice + ' VNT'
    })
    data.push({
      key: 'nonce',
      fieldName: <LocalText id="tdpField12" />,
      value: Nonce
    }),
      data.push({
        key: 'index',
        fieldName: <LocalText id="tdpField17" />,
        value: Index
      }),
      data.push({
        key: 'input',
        fieldName: <LocalText id="tdpField13" />,
        value: (
          <div>
            {textSplit(Input, trunInterval).map(item => (
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
          <TxDetailTable
            columns={columns}
            data={data}
            tableType="2colDetail"
            pagination={false}
          />
        )}
    </div>
  )
}
