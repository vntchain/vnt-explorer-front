import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return state
}

function RPDataProvider(props) {
  const {
    options: { path, ns, field }
  } = props

  // 取 model 中的字段值（后端获取的数据）
  // console.log('DataProvider',props,ns,field) //eslint-disable-line
  const [context, setContext] = useState(props[props.options.ns][field])

  useEffect(() => {
    props.dispatch({
      type: 'dataRelayNew/fetchData',
      payload: { path, ns, field }
    })

    const requirePolling = props.options.polling && props.options.polling > 0
    let polling = null
    if (requirePolling) {
      polling = setInterval(() => {
        props.dispatch({
          type: 'dataRelayNew/fetchData',
          payload: { path, ns, method: props.method || 'get', field }
        })
      }, props.options.polling * 1000)
    }
    return () => {
      if (polling) {
        clearInterval(polling)
      }
    }
  }, [])

  useEffect(
    () => {
      setContext({ ...props[props.options.ns][field] })
    },
    [props[props.options.ns][field]]
  )

  // 注入数据
  return <Fragment>{props.render(context)}</Fragment>
}

RPDataProvider.propTypes = {
  options: PropTypes.shape({
    path: PropTypes.string.isRequired, // 请求接口地址
    ns: PropTypes.string.isRequired, // 要更新的 model 的名称
    field: PropTypes.string.isRequired, // 要更新的字段
    polling: PropTypes.number // 轮询间隔，单位毫秒
  })
}

export default connect(mapStateToProps)(RPDataProvider)
