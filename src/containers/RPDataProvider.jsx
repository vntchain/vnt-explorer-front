import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(function RPDataProvider(props) {
  const [context, setContext] = useState({
    data: props[props.options.ns].data,
    error: props[props.options.ns].error,
    isLoading: props[props.options.ns].isLoading
  })

  useEffect(() => {
    const {
      options: { type, path, ns }
    } = props
    props.dispatch({
      type: 'dataRelay/fetchData',
      payload: { path, type, ns, method: props.method || 'get' }
    })

    const requirePolling = props.options.polling && props.options.polling > 0
    let polling = null
    if (requirePolling) {
      polling = setInterval(() => {
        props.dispatch({
          type: 'dataRelay/fetchData',
          payload: { path, type, ns, method: props.method || 'get' }
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
      setContext({ ...props[props.options.ns] })
    },
    [props[props.options.ns].isLoading]
  )

  return <Fragment>{props.render(context)}</Fragment>
})
