import React from 'react'

import withLang from 'i18n/withLang'

export default withLang(function TxCount(props) {
  return (
    <div>
      {props.context && props.context.data
        ? props.locale[props.language][props.id](props.context.data.length)
        : ' '}
    </div>
  )
})
