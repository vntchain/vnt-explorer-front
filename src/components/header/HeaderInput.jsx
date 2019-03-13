import React from 'react'
import { connect } from 'react-redux'
import { Input, message } from 'antd'

import withLang from 'i18n/withLang'
import apis from 'utils/apis'

import styles from './Header.scss'

function HeaderInput(props) {
  const handleSearch = v => {
    const keyword = v.trim()
    if (keyword) {
      message.info(`Searing keyword ${v}...`, 30)
      props.dispatch({
        type: 'dataRelay/fetchData',
        payload: {
          path: `${apis.search}/${keyword}`,
          ns: 'search',
          field: 'searchResult'
        }
      })
    }
  }

  return (
    <div className={styles.input}>
      <Input.Search
        placeholder={props.locale[props.language].hdSearchPh}
        enterButton
        onSearch={handleSearch}
      />
    </div>
  )
}

export default connect()(withLang(HeaderInput))
