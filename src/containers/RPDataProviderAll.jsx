import React, { Fragment, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return state
}

function RPDataProvider(props) {
  const { optionsArr } = props

  // reducer管理状态，state会有引用问题？？？

  const reducer = (state, action) => {
    switch (action.type) {
      case 'assign':
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, {})
  const handleResult = (ns, result) => {
    dispatch({
      type: 'assign',
      payload: {
        [ns]: result
      }
    })
  }

  useEffect(() => {
    let pollingArr = {}
    optionsArr.map(options => {
      const { path, ns, field } = options
      props.dispatch({
        type: 'dataRelayNew/fetchData',
        payload: { path, ns, field },
        callback: handleResult
      })

      const requirePolling = options.polling && options.polling > 0
      if (requirePolling) {
        pollingArr[ns] = setInterval(() => {
          if(!document.hidden){
            props.dispatch({
              type: 'dataRelayNew/fetchData',
              payload: { path, ns, method: props.method || 'get', field },
              callback: handleResult
            })
          }
        }, options.polling * 1000)
      }
    })
    return () => {
      const pollingKeys = Object.keys(pollingArr)
      if (pollingKeys.length) {
        pollingKeys.map(key => {
          clearInterval(pollingArr[key])
        })
      }
    }
  }, [])

  // 注入数据
  return <Fragment>{props.render(state)}</Fragment>
}

RPDataProvider.propTypes = {
  options: PropTypes.shape([
    {
      path: PropTypes.string.isRequired, // 请求接口地址
      ns: PropTypes.string.isRequired, // 要更新的 model 的名称
      field: PropTypes.string.isRequired, // 要更新的字段
      polling: PropTypes.number // 轮询间隔，单位毫秒
    }
  ])
}

export default connect(mapStateToProps)(RPDataProvider)
