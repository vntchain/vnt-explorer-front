import React, { useEffect } from 'react'
import { Input } from 'antd'
import axios from 'axios'

import { LangContext } from 'i18n/LangContext'
import cn from 'i18n/locale/cn'
import en from 'i18n/locale/en'

import styles from './Header.scss'

const locale = {
  cn,
  en
}

export default function HeaderInput() {
  useEffect(() => {
    axios.get('http://192.168.9.66:8080/v1/test/1').then(res => {
      /* eslint-disable */
      console.log('%c%s\n%cresponse: %o', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', res)
      /* eslint-enable */
    })
  }, [])

  const handleSearch = v => {
    /* eslint-disable */
    console.log('%c%s\n%csearch content: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', )
    console.log(v)
    /* eslint-enable */
  }

  return (
    <LangContext.Consumer>
      {({ lang }) => (
        <div className={styles.input}>
          <Input.Search
            placeholder={locale[lang].hdSearchPh}
            enterButton
            allowClear
            onSearch={handleSearch}
          />
        </div>
      )}
    </LangContext.Consumer>
  )
}
