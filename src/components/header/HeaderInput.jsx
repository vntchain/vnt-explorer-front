import React from 'react'
import { Input } from 'antd'

import hocLangPasser from 'i18n/hocLangPasser'

import styles from './Header.scss'

function HeaderInput(props) {
  const handleSearch = v => {
    /* eslint-disable */
    console.log('%c%s\n%csearch content: %s', 'color: white; background: #029e74; font-size: 16px;', '________________________', 'color: #ff9200; background: #363636;', )
    console.log(v)
    /* eslint-enable */
  }

  return (
    <div className={styles.input}>
      <Input.Search
        placeholder={props.locale[props.language].hdSearchPh}
        enterButton
        allowClear
        onSearch={handleSearch}
      />
    </div>
  )
}

export default hocLangPasser(HeaderInput)
