import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { pageSize } from 'constants/config'

// 提供翻页功能的组件
function PageProvider(props) {
  const {
    comp: Comp,
    refreshProof,
    redirectBase,
    options,
    currentIndex,
    ...passThroughProps
  } = props
  const { basePath, ...restOptions } = options

  const [currPage, setCurrPage] = useState(currentIndex)

  const handleFlipPage = p => {
    if (refreshProof) {
      let filter = ''
      if (props.filterParam) {
        const arr = props.filterParam.split('&')
        filter = arr[arr.length - 1] + '/'
      }
      props.dispatch(push(`${redirectBase}/${filter}${p}`))
    } else {
      setCurrPage(p)
    }
    props.dispatch({
      type: 'dataRelayNew/fetchData',
      payload: {
        ...restOptions,
        path: `${basePath}${props.filterParam || ''}&offset=${(parseInt(p, 10) -
          1) *
          pageSize}`
      }
    })
  }

  useEffect(
    () => {
      setCurrPage(currentIndex)
    },
    [currentIndex]
  )

  return (
    <Comp
      flipPage={handleFlipPage}
      currentIndex={currPage}
      {...passThroughProps}
    />
  )
}

PageProvider.propTypes = {
  comp: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.func.isRequired
  ]),
  refreshProof: PropTypes.bool.isRequired,
  currentIndex: PropTypes.number.isRequired,
  options: PropTypes.shape({
    basePath: PropTypes.string.isRequired,
    ns: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired
  }).isRequired,
  filterParam: PropTypes.string // needs to pass through (for Tx list)
}

export default connect()(PageProvider)
