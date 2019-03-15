import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
// eslint-disable-next-line
import { push } from 'react-router-redux'

import TxCount from 'components/txs/TxCount'
import TxList from 'components/txs/TxList'
import DataProvider from 'containers/RPDataProvider'

import apis from 'utils/apis'
import { pageSize } from 'constants/config'

const mapStateToProps = ({ transactions: { txs } }) => {
  return {
    txs
  }
}

// concatenate the request path for txs
const pathProcessor = search => {
  let path = apis.txs
  const paramObj = queryString.parse(search)

  if (Object.keys(paramObj).length) {
    if (!paramObj.p) {
      path += search + `&limit=${pageSize}&offset=0`
      return path
    } else {
      // with p in url
      const page = paramObj.p ? parseInt(paramObj.p, 10) : 1
      path += `?offset=${(page - 1) * pageSize}`

      for (const prop in paramObj) {
        if (prop !== 'p') {
          path += `&` + `${prop}=${paramObj[prop]}`
        }
      }
      return path + `&limit=${pageSize}`
    }
  } else {
    // no params
    return (path += `?offset=0&limit=${pageSize}`)
  }
}

// update url params (`location.search`) when page changes
// page size, offset are hidden in url
// page in url is `p`, in path is `offset`
// eslint-disable-next-line
const paramsProcessor = (p) => {
  const paramObj = queryString.parse(location.search)
  // update value for `p`
  paramObj.p = p
  let params = '?'
  let i = 0
  let l = Object.keys(paramObj).length
  for (const prop in paramObj) {
    params += `${prop}=${paramObj[prop]}`
    params += i < l - 1 ? '&' : ''
    i++
  }
  return params
}

export default connect(mapStateToProps)(function Txs(props) {
  const turnPage = p => {
    const params = paramsProcessor(p)

    /* eslint-disable */
    console.log('%c%s\n%cparams: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', params)
    /* eslint-enable */

    // update params
    // concatenate url
    let url = location.pathname.split('?')[0] + params

    // push url
    props.dispatch(push(url))

    /* eslint-disable */
    console.log('%c%s\n%c: %', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', )
    console.log(pathProcessor(params))
    /* eslint-enable */

    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: {
        path: pathProcessor(params),
        ns: 'transactions',
        field: 'txs'
      }
    })
  }

  return (
    <div>
      <DataProvider
        options={{
          path: pathProcessor(location.search),
          ns: 'transactions',
          field: 'txs'
        }}
        render={data => (
          <Fragment>
            <TxCount context={data} />
            <TxList context={data} handlePageTuring={turnPage} />
          </Fragment>
        )}
      />
    </div>
  )
})
