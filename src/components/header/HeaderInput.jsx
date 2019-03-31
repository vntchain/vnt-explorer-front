// eslint-disable-next-line
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Input, message } from 'antd'

import withLang from 'i18n/withLang'
import apis from 'utils/apis'

import styles from './Header.scss'

const mapStateToProps = ({ search: { error } }) => {
  return {
    error
  }
}

export default withLang(
  connect(mapStateToProps)(function HeaderInput(props) {
    const handleSearch = v => {
      props.dispatch({
        type: 'search/setError',
        payload: null
      })
      const keyword = v.trim()
      if (keyword) {
        message.info(`Searing keyword ${v}...`, 30)
        props.dispatch({
          type: 'dataRelayNew/fetchData',
          payload: {
            path: `${apis.search}/${keyword}`,
            ns: 'search',
            field: 'searchResult'
          }
        })
      }
    }

    useEffect(
      () => {
        if (props.error) {
          message.error(props.locale[props.language][props.error])
        }
      },
      [props.error]
    )

    return (
      <div className={styles.input}>
        <Input.Search
          placeholder={props.locale[props.language].hdSearchPh}
          enterButton
          onSearch={handleSearch}
        />
      </div>
    )
  })
)
